import { Module } from '@nestjs/common'
import { EmailsService } from './emails.service'
import { EmailsController } from './emails.controller'
import { PrismaService } from 'src/prisma.service'
import { MessagesService } from 'src/utils/messages'

@Module({
  controllers: [EmailsController],
  providers: [EmailsService, PrismaService, MessagesService],
})
export class EmailsModule {}
