import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { MessagesService } from 'src/utils/messages'
import { GetUserDto, GetUserDataDto,GetUserProfileDto } 
from 'src/dto/users.dto'
import { IdOrEmail } from 'src/utils/id_or_email'

@Injectable()
export class UsersService {

    constructor( 
        private readonly prisma:PrismaService,
        private readonly messages:MessagesService
    ) {}

    async getUser(req:GetUserDto) {

        console.log('Hola hola')
        const user = await this.prisma.users.findUnique({
            where: IdOrEmail( req.id, req.email, { deletedAt : null } ) 
        })
        
        if ( !user ) 
            throw this.messages.notFoundUser()

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

        return clean_response

    }

    async getUserData(req: GetUserDataDto) {
        console.log(req)
        const user = await this.prisma.users.findFirst({
            where: IdOrEmail( req.id, req.email )
        })

        if( !user ) throw this.messages.notFoundUserData()

        return user.user_data 
        
    }

    async getUserProfile(req: GetUserProfileDto) {

        const user = await this.prisma.users.findUnique({
            where: IdOrEmail( req.id, req.email )
        })

        const subscription = await this.prisma.subscriptions.findUnique({
            where: IdOrEmail( req.id, req.email )
        })

        if( !user ) 
            throw this.messages.notFoundUser()

        return {
            ...user,
            user_data: user.user_data,
            subscription: subscription || null
        }

    }

}