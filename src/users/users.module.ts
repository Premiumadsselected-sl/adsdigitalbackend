import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { PrismaService } from 'src/prisma.service'
import { JwtService } from '@nestjs/jwt'

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [UsersService, PrismaService, JwtService]
})
export class UsersModule {}
