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
    ) { }

    async getUser(req:GetUserDto) {

        const user = await this.prisma.users.findUnique({
            where: IdOrEmail( req.id, req.email, { deletedAt : null } ) 
        })
        
        if ( !user ) 
            throw this.messages.notFound() 

        return user 

    }

    async getUserData(req: GetUserDataDto) {
        
        const user = await this.prisma.users.findFirst({
            where: IdOrEmail( req.id, req.email )
        })

        if( !user ) throw this.messages.notFound() 

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
            throw this.messages.notFound()

        return {
            ...user,
            user_data: user.user_data,
            subscription: subscription || null
        }

    }

}
