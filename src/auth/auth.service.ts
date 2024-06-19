import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { MessagesService } from 'src/utils/messages'
import { PrismaService } from 'src/prisma.service'
import { AuthDto } from 'src/dto/auth.dto'
import { EmailDto } from 'src/emails/dto/email.dto'
import * as dto from 'src/dto/users.dto'
import * as bcrypt from 'bcrypt'
import * as nodemailer from 'nodemailer'
import { ResetPasswordEmailHtmlTemplate } from 'src/utils/emails_template'

@Injectable()
export class AuthService extends MessagesService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) { super() }

    auth( credentials: AuthDto ) {
        return 'This is auth login page credentials : ' + credentials
    }

    async login(req: dto.LoginDto){
        
        if( !req.password || req.password === '' ) 
            return this.invalidPasswordError()

        try {

            const user = await this.prisma.users.findUnique({
                where: { email: req.email }
            })
    
            if( !user )
                return this.badRequest(user)
    
            const isPasswordValid = await bcrypt.compare(req.password, user.password)
    
            if (!isPasswordValid) 
                return this.invalidPasswordError()
            
            const payload = { email: user.email, role: user.role }
            const token = await this.jwtService.signAsync(payload)

            return {
                ...this.successLogin(),
                token: token,
                email: user.email,
            }

        }

        catch(error) {
            return this.internalServerError(error)
        }
        
    }

    async logout(req: dto.LogoutDto) {
        
        try{
                    
            const user = await this.prisma.users.update({
                where: { email: req.email },
                data: { status: 'offline' }
            })

            if( !user ) 
                return this.badRequest(user)

            return this.successLogOut()

        }

        catch( error ) {
            return this.internalServerError( error )
        }

    }

    async register(req: dto.RegisterDto){

        if( !req.password || req.password === '' ) 
            return this.invalidPasswordError()

        if( !req.user_name || req.user_name === '' )
            return this.invalidPasswordError()

        try{
                
            const user = await this.prisma.users.create({
                data: {
                    user_name: req.user_name,
                    email: req.email,
                    password: bcrypt.hashSync(req.password, 10)
                }
            })

            if( !user ) 
                return this.badRequest(user)

            const payload = { email: user.email, role: user.role }
            const token = await this.jwtService.signAsync(payload)

            return {
                ...this.successRegister(),
                token: token,
                email: user.email,
            }

        }

        catch( error ) {
            return this.internalServerError( error )
        }
        
    }

    async forgotPassword(req: dto.ForgotPasswordDto) {
        
        try {
            
            const user = await this.prisma.users.findFirst({
                where: { email: req.email }
            })

            if( !user )
                return this.badRequest(user)

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
                
                if (error) {

                    // Note: This action make a log of the email sent
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

                    return this.forgotPasswordMessageError(error)
                }

                // Note: This action make a log of the email sent
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

        catch( error ) {
            return this.internalServerError( error )
        }

    }

    async changePassword(req: dto.ChangePasswordDto) {
        
        try{
                
            const hashedPassword = bcrypt.hashSync(req.password, 10)
            const user = await this.prisma.users.update({
                where: { email: req.email },
                data: { password: hashedPassword }
            })

            if( !user ) 
                return this.badRequest(user)

            return this.successCreateUser()
        }

        catch( error ) {
            return this.internalServerError( error )
        }

    }

    async updateUser(req: dto.UpdateUserDto) {
        
        let user = null

        try {

            if( !req.id || req.id === '' )
                user = await this.prisma.users.update({
                    where: { email: req.email },
                    data: { user_name: req.user_name }
                })
            else
                user = await this.prisma.users.update({
                    where: { id: req.id.toString() },
                    data: { user_name: req.user_name }
                })
        
            if( !user ) 
                return this.badRequest(user)

            return user

        }

        catch( error ) {
            return this.internalServerError(error)
        }

    }

    async deleteUser(req: dto.DeleteUserDto) {
        
        let user = null

        try {

            if( !req.id || req.id === '' )
                user =
                await this.prisma.users.update({
                    where: { email: req.email },
                    data: { deletedAt: new Date() }
                })

            else user =
                await this.prisma.users.update({
                    where: { id: req.id.toString() },
                    data: { deletedAt: new Date() }
                })

            if( !user )
                return this.badRequest(user)

            return user

        }
            
        catch( error ) {
            return this.internalServerError(error)
        }

    }

    async logEmail(req: EmailDto) {
            
        try{
                
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
                return this.badRequest(user)

            return this.successCreateUser()

        }

        catch( error ) {
            return this.internalServerError( error )
        }

    }

    async setUserData(req: dto.SetUserDataDto) {
        
        try{
                    
            const user = await this.prisma.users.update({
                where: { email: req.email },
                data: { user_data: req.user_data }
            })

            if( !user ) 
                return this.badRequest(user)

            return this.successCreateUser()

        }

        catch( error ) {
            return this.internalServerError( error )
        }

    }  
    
    async updateUserData(req: dto.UpdateUserDataDto) {
        
        let user = null

        try{
            
            if( !req.id || req.id === '' )
                user = await this.prisma.users.update({
                    where: { email: req.email },
                    data: { 
                        user_data: req.user_data
                    }
                })
            else
                user = await this.prisma.users.update({
                    where: { id: req.id.toString() },
                    data: { 
                        user_data: req.user_data
                    }
                })

            if( !user ) 
                return this.badRequest(user)

            return this.successCreateUser()

        }

        catch( error ) {
            return this.internalServerError( error )
        }

    }
    
    async updateUserProfile(req: dto.UpdateUserProfileDto) {
            
        let user = null

        try{
                
            if( !req.id || req.id === '' )
                user = await this.prisma.users.update({
                    where: { email: req.email },
                    data: { user_name: req.user_name }
                })
            else
                user = await this.prisma.users.update({
                    where: { id: req.id.toString() },
                    data: { user_name: req.user_name }
                })

            if( !user ) 
                return this.badRequest(user)

            return this.successUserProfileUpdate()

        }

        catch( error ) {
            return this.internalServerError( error )
        }

    }

          
    
    




      

}
