import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'
import { UsersModule } from './users/users.module'
import { UsersService } from './users/users.service'
import { SubscriptionsModule } from './subscriptions/subscriptions.module'
import { SubscriptionsService } from './subscriptions/subscriptions.service'
import { TefpayModule } from './payments/tefpay/tefpay.module'
import { TefpayService } from './payments/tefpay/tefpay.service'
import { PrismaService } from './prisma.service'
import { GetSubscriptionDto, CreateSubscriptionDto } from './dto/subscriptions.dto'
import { GetUserDto } from './dto/users.dto'
import { EmailsModule } from './emails/emails.module'
import { MessagesService } from './utils/messages'
import { JwtService } from '@nestjs/jwt'
import { JwtModule } from '@nestjs/jwt'

@Module({
  controllers: [],
  imports: [
    AuthModule, 
    UsersModule, 
    SubscriptionsModule, 
    TefpayModule, 
    EmailsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }
    })
  ],
  providers: [
    AuthService, 
    PrismaService, 
    UsersService, 
    SubscriptionsService, 
    TefpayService,
    MessagesService,
    JwtService,
    GetUserDto, 
    GetSubscriptionDto, 
    CreateSubscriptionDto
  ]
})
export class AppModule {}
