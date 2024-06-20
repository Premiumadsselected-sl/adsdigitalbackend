import { Module } from '@nestjs/common'
import { TefpayController } from './tefpay.controller'
import { TefpayService } from './tefpay.service'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service'
import { PrismaService } from 'src/prisma.service'
import { MessagesService } from 'src/utils/messages'

@Module({
  imports: [UsersModule],
  controllers: [TefpayController],
  providers: [
    TefpayService, 
    UsersService, 
    SubscriptionsService, 
    PrismaService,
    MessagesService
  ]
})
export class TefpayModule {}
