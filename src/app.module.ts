import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { SubscriptionsModule } from './subscriptions/subscriptions.module'
import { TefpayModule } from './payments/tefpay/tefpay.module'
import { EmailsModule } from './emails/emails.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    AuthModule,
    SubscriptionsModule, 
    UsersModule,
    EmailsModule,
    TefpayModule, 
  ]
})
export class AppModule {}
