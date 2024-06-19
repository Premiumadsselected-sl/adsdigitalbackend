import { Module } from '@nestjs/common'
import { SubscriptionsController } from './subscriptions.controller'
import { SubscriptionsService } from './subscriptions.service'
import { PrismaService } from 'src/prisma.service'
import { MessagesService } from 'src/utils/messages'

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, PrismaService, MessagesService]
})
export class SubscriptionsModule {}
