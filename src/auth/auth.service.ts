import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { MessagesService } from 'src/utils/messages'
import { PrismaService } from 'src/prisma.service'
import { AuthDto } from 'src/dto/auth.dto'
import { CreateEmailTdo } from 'src/emails/dto/email.dto'
import * as dto from 'src/dto/users.dto'
import * as bcrypt from 'bcrypt'
import * as nodemailer from 'nodemailer'
import { ResetPasswordEmailHtmlTemplate } from 'src/utils/emails_template'
import { IdOrEmail } from 'src/utils/id_or_email'

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly messages: MessagesService
    ) {  }

    auth( credentials: AuthDto ) {
        return 'This is auth login page credentials : ' + credentials
    }

    async login(req: dto.LoginDto){
        
        if( !req.password || req.password === '' ) 
            throw this.messages.invalidPasswordError()

        const user = await this.prisma.users.findUnique({
            where: { email: req.email }
        })

        if( !user )
            throw this.messages.notFoundUser()
            
        const isPasswordValid = 
        await bcrypt.compare(req.password, user.password)

        if (!isPasswordValid) 
            throw this.messages.invalidPasswordError()
        
        const payload = { email: user.email, role: user.role }
        const token = await this.jwtService.signAsync(payload)

        const save_token = await this.prisma.users.update({
            where: { email: user.email },
            data: { token: token }
        })

        if( !save_token ) 
            throw this.messages.userNotUpdated()

        return {
            ...this.messages.successLogin(),
            token: token,
            email: user.email,
        }
        
    }

    async logout(req: dto.LogoutDto) {
        
        const user = await this.prisma.users.update({
            where: { email: req.email },
            data: { status: 'offline' }
        })

        if( !user ) 
            throw this.messages.logOutError()

        return this.messages.successLogOut()

    }

    async register(req: dto.RegisterDto){
        
        if( !req.password || req.password === '' ) 
            throw this.messages.invalidPasswordError()

        if( !req.user_name || req.user_name === '' )
            throw this.messages.invalidUserNameError()

        const is_registered = await this.prisma.users.findFirst({
            where: { email: req.email }
        })

        if( is_registered )
            throw this.messages.userAlreadyRegistered()

        const user = await this.prisma.users.create({
            data: {
                user_name: req.user_name,
                email: req.email,
                password: bcrypt.hashSync(req.password, 10)
            }
        })

        if( !user ) 
            throw this.messages.userNotUpdated()

        return {
            ...this.messages.successRegister(),
            email: user.email,
        }
        
    }

    async forgotPassword(req: dto.ForgotPasswordDto) {
        
        const user = await this.prisma.users.findFirst({
            where: { email: req.email }
        })

        if( !user )
            throw this.messages.notFoundUser()

        const passwordResetLink = `
        ${user.user_service_domain_url}
        /reset-password?token='${user.user_password_token}'
        `
        let passwordResetLinkHtml = await import(`/messages/${user.locale}`)
        passwordResetLinkHtml = await passwordResetLinkHtml.json().passwordResetLinkHtml
        
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST, 
            port: parseInt(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })

        let mailOptions = {
            from: user.user_service_support_email,
            to: user.email, 
            subject: `${user.user_service_name} - ${passwordResetLinkHtml.title}`,
            text: `${passwordResetLinkHtml.subtitle}`+passwordResetLink,
            html: ResetPasswordEmailHtmlTemplate({
                title: passwordResetLinkHtml.title,
                subtitle: passwordResetLinkHtml.subtitle,
                password_reset_text: passwordResetLinkHtml.password_reset_text,
                password_reset_link: passwordResetLink,
                policy_text: passwordResetLinkHtml.policy_text,
                terms_text: passwordResetLinkHtml.terms_text,
                styles: user.user_service_emails_styles,
                locale: user.locale
            })
        }

        return await transporter.sendMail(mailOptions, function (error: any, info: { response: string }) {
            
            if ( error ) {
                
                this.logEmail({
                    user_id: user.id,
                    user_name: user.user_name,
                    email: user.email,
                    email_status: 'error',
                    email_code: 'forgot_password',
                    email_date: new Date().toISOString(),
                    email_subject: mailOptions.subject,
                    email_body: mailOptions.text,
                    email_response: info.response,
                    email_error: error
                })

                throw this.forgotPasswordMessageError(error)
            }

            this.logEmail({
                user_id: user.id,
                user_name: user.user_name,
                email: user.email,
                email_status: 'sent',
                email_code: 'forgot_password',
                email_date: new Date().toISOString(),
                email_subject: mailOptions.subject,
                email_body: mailOptions.text,
                email_response: info.response,
                email_error: ''
            })

            return this.successForgotPasswordMessageSend(info.response)

        })

    }

    async changePassword(req: dto.ChangePasswordDto) {
        
        const hashedPassword = bcrypt.hashSync(req.password, 10)
        const user = await this.prisma.users.update({
            where: { email: req.email },
            data: { password: hashedPassword }
        })

        if( !user ) 
            throw this.messages.changePasswordError()

        return this.messages.successCreateUser()

    }

    async updateUser(req: dto.UpdateUserDto) {
        
        const user = await this.prisma.users.update({
            where: IdOrEmail( req.id, req.email ),
            data: { user_name: req.user_name }
        })
    
        if( !user ) 
            throw this.messages.userNotUpdated()

        return user

    }

    async deleteUser(req: dto.DeleteUserDto) {
        
        const user = await this.prisma.users.update({
            where: IdOrEmail( req.id, req.email ),
            data: { deletedAt: new Date() }
        })

        if( !user )
            throw this.messages.userDeleteError()

        const { 
            password,
            token, 
            user_password_token, 
            user_service_emails_styles,
            user_service_domain_url,
            user_service_support_email,
            user_service_name,
            ...clean_response
        } = user

        return {
            clean_response,
            ...this.messages.successUserDeleted()
        }

    }

    async logEmail(req: CreateEmailTdo) {
            
        const user = await this.prisma.emails.create({
            data: {
                user_id: req.user_id,
                user_name: req.user_name,
                email: req.email,
                email_status: req.email_status,
                email_code: req.email_code,
                email_date: req.email_date,
                email_subject: req.email_subject,
                email_body: req.email_body,
                email_response: req.email_response,
                email_error: req.email_error
            }
        })

        if( !user ) 
            throw this.messages.logEmailError()

        return this.messages.successCreateUser()

    }

    async setUserData(req: dto.SetUserDataDto) {
        console.log(req)
        const user = await this.prisma.users.update({
            where: IdOrEmail( req.id, req.email ),
            data: { user_data: req.user_data }
        })

        if( !user ) 
            throw this.messages.setUserDataError()

        return this.messages.successUpdateUserData()

    }  
    
    async updateUserData(req: dto.UpdateUserDataDto) {
        
        const user = await this.prisma.users.update({
            where: IdOrEmail( req.id, req.email ),
            data: { user_data: req.user_data }
        })

        if( !user ) 
            throw this.messages.updateUserDataError()

        return this.messages.successCreateUser()

    }
    
    async updateUserProfile(req: dto.UpdateUserProfileDto) {
            
        const user = await this.prisma.users.update({
            where: { email: req.email },
            data: { user_name: req.user_name }
        })

        if( !user ) 
            throw this.messages.updateUserProfileError()

        return this.messages.successUserProfileUpdate()

    }  

}