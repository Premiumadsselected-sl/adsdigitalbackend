import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { PrismaService } from 'src/prisma.service'
import { MessagesService } from 'src/utils/messages'
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service'
import { JwtService } from '@nestjs/jwt'

@Module({
    controllers: [UsersController],
    providers: [
        JwtService,
        UsersService, 
        SubscriptionsService,
        PrismaService, 
        MessagesService
    ],
    exports: [UsersService]
})
export class UsersModule {}
