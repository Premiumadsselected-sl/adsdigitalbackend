import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { PrismaService } from 'src/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { MessagesService } from 'src/utils/messages'

@Module({
    controllers: [UsersController],
    providers: [UsersService, PrismaService, JwtService, MessagesService],
    exports: [UsersService]
})
export class UsersModule {}
