import { Module } from '@nestjs/common'
import { TefpayController } from './tefpay.controller'
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service'
import { TefpayService } from './tefpay.service'
import { UsersService } from 'src/users/users.service'
import { PrismaService } from 'src/prisma.service'
import { MessagesService } from 'src/utils/messages'

@Module({
  controllers: [TefpayController],
  providers: [
    TefpayService, 
    SubscriptionsService, 
    UsersService, 
    PrismaService,
    MessagesService
  ]
})
export class TefpayModule {}
