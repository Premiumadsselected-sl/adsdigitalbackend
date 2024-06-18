import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UsersService } from 'src/users/users.service'
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service'
import { TefpayDto } from './dto/tefpay.dto'
import { MessagesService } from 'src/utils/messages'

@Injectable()
export class TefpayService extends MessagesService {

  constructor( 
    private readonly subscriptionService: SubscriptionsService, 
    private readonly UsersService: UsersService,
    private readonly prisma:PrismaService,
    private readonly messages: MessagesService
  ) { super() }

  async paymentFlow( req: TefpayDto ) {
    
    try{

      const user = await this.UsersService.getUser({
        id: req.user_id,
        email: req.email
      })

      if( user['statusCode'] === 404 ) 
        throw user

      const user_subscription = await this.subscriptionService.getSubscription({
        user_id: user.id,
        email: user.email
      })

      if( user_subscription['statusCode'] !== 404 ) 
        throw user_subscription

      const create_payment = await this.prisma.payments.create({ data: {
        user_id: user.id,
        user_name: user.user_name,
        email: user.email,
        payment_code: req.payment_code
      }})

      if( create_payment['statusCode'] === 500 ) 
        throw create_payment

      const create_suscription = await this.subscriptionService.createSubscription({
        user_id: user.id,
        user_name: user.user_name,
        email: user.email,
        subscription_code: req.payment_code
      })

      if( create_suscription['statusCode'] === 500 ) 
        throw create_suscription
      
      const { password, ...account } = user
      const { ...payment } = create_payment
      const { ...subscription } = create_suscription
      
      return {
        ...this.messages.successPaymentFlow(),
        account,
        payment,
        subscription
      }

    }

    catch( error ) { 
      return this.subscriptionService.internalServerError(error) 
    }

  }

  async findAll() {
    
    try{
      
      const tefpay = await this.prisma.payments.findMany()

      if( !tefpay ) throw tefpay

      return tefpay

    }

    catch( error ) { 
      return this.subscriptionService.internalServerError(error) 
    }

  }

  async findOne(req: TefpayDto) {
    
    try{
      
      const tefpay = await this.prisma.payments.findUnique({ where: { id: String(req.id) } })

      if( !tefpay ) throw tefpay

      return tefpay

    }

    catch( error ) { 
      return this.subscriptionService.internalServerError(error) 
    }

  }

  async update(req: TefpayDto) {
      
      try{
        
        const tefpay = await this.prisma.payments.update({ where: { id: String(req.id) }, data: {
          user_id: req.user_id,
          user_name: req.user_name,
          email: req.email,
          payment_code: req.payment_code,
          payment_status: req.payment_status,
          payment_date: req.payment_date,
          payment_amount: req.payment_amount,
          payment_currency: req.payment_currency,
          payment_method: req.payment_method,
          payment_details: req.payment_details,
          payment_response: req.payment_response,
          payment_error: req.payment_error,
          payment_refund: req.payment_refund,
          payment_refund_date: req.payment_refund_date,
          payment_refund_reason: req.payment_refund_reason,
          payment_refund_status: req.payment_refund_status,
          payment_refund_code: req.payment_refund_code,
          payment_refund_amount: req.payment_refund_amount,
          payment_refund_currency: req.payment_refund_currency,
          payment_refund_method: req.payment_refund_method,
          payment_refund_details: req.payment_refund_details,
          payment_refund_response: req.payment_refund_response,
          payment_refund_error: req.payment_refund_error,
          payment_logs: req.payment_logs
        } })
  
        if( !tefpay ) throw tefpay
  
        return tefpay
  
      }
  
      catch( error ) { 
        return this.subscriptionService.internalServerError(error) 
      }
  }

  async remove(req: TefpayDto) {
      
      try{
        
        const tefpay = await this.prisma.payments.delete({ where: { id: String(req.id) } })
  
        if( !tefpay ) throw tefpay
  
        return tefpay
  
      }
  
      catch( error ) { 
        return this.subscriptionService.internalServerError(error) 
      }

  }

}
