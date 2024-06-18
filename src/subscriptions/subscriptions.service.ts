import { Injectable, HttpCode } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { MessagesService } from 'src/utils/messages'
import { GetSubscriptionDto, validateSubscription, CreateSubscriptionDto,
UpdateSubscription, DownSubscription
} from 'src/dto/subscriptions.dto'

@Injectable()
export class SubscriptionsService extends MessagesService{
    
    constructor( private prisma:PrismaService ) { super() }

    async createSubscription(req: CreateSubscriptionDto) {
        
        try{

            const subscription = await this.prisma.subscriptions.create(
                { data: { 
                    user_id: req.user_id, 
                    user_name: req.user_name, 
                    email: req.email,
                    subscription_code: req.subscription_code,
                    trial_start: new Date().toISOString(),
                    trial_end: new Date( new Date().getTime() + 24 * 60 * 60 * 1000 ).toISOString()
                } }
            )

            if( !subscription ) 
                throw subscription

            return subscription

        }

        catch( error ) { 
            return this.internalServerError(error) 
         }

    }

    async getSubscription(req: GetSubscriptionDto) {
        
        try{
            
            const subscription = await this.prisma.subscriptions.findUnique({ 
                where: { user_id: req.user_id, email: req.email } 
            })
    
            if( !subscription ) 
                return this.subscriptionNotFound()
    
            return this.subscriptionFound()
        }

        catch( error ) { 
            return this.internalServerError(error) 
        }
    
    }

    async validateSubscription(req: validateSubscription) {
        
        try{

            const subscription = await this.prisma.subscriptions.findUnique({
                where: { user_id: req.user_id, email: req.email }
            })

            if( !subscription ) 
                return this.subscriptionNotFound()

            if( subscription.subscription_status === 'active' ) 
                return this.subscriptionFound()

            return this.subscriptionNotFound()

        }

        catch( error ) {
            return this.internalServerError(error)
        }


    }

    updateSubscription(req: UpdateSubscription) {
        
        try{
            
            const subscription = this.prisma.subscriptions.update({
                where: { user_id: req.user_id },
                data: { email: req.email, subscription_status: req.subscription_status }
            })

            if( !subscription ) 
                return this.subscriptionNotFound()

            return this.subscriptionUpdated()
        }

        catch( error ) {
            return this.internalServerError(error)
        }

    }

    downSubscription(req: DownSubscription) {
        
        try{

            const subscription = this.prisma.subscriptions.update({
                where: { user_id: req.user_id },
                data: { 
                    email: req.email, 
                    subscription_status: 'down',
                    down_date: new Date().toISOString(),
                    down_reason: req.down_reason
                }
            })

            if( !subscription ) 
                return this.subscriptionNotFound()

            return this.subscriptionDownded()

        }

        catch( error ) {
            return this.internalServerError(error)
        }

    }


    






}
