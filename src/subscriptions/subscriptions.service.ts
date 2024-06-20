import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { MessagesService } from 'src/utils/messages'
import { GetSubscriptionDto, validateSubscription, CreateSubscriptionDto,
UpdateSubscription, DownSubscription
} from 'src/dto/subscriptions.dto'

@Injectable()
export class SubscriptionsService {
    
    constructor( 
        private readonly prisma:PrismaService,
        private readonly messages:MessagesService
     ) { }

    async createSubscription(req: CreateSubscriptionDto) {
        
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
            throw this.messages.subscriptionNotCreated()

        return subscription

    }

    async getSubscription(req: GetSubscriptionDto) {
        
        const subscription = await this.prisma.subscriptions.findUnique({ 
            where: { user_id: req.user_id, email: req.email } 
        })

        if( !subscription ) 
            throw this.messages.subscriptionNotFound()

        return subscription
    
    }

    async validateSubscription(req: validateSubscription) {
        
        const subscription = await this.prisma.subscriptions.findUnique({
            where: { user_id: req.user_id, email: req.email }
        })

        if( !subscription ) 
            throw this.messages.subscriptionNotFound()

        if( subscription.subscription_status !== 'active' ) 
            throw {
                status: subscription.subscription_status,
                ...this.messages.subscriptionNotActive()
            }

        return {
            status: subscription.subscription_status,
            ...this.messages.subscriptionFound(subscription.subscription_status)
        }

    }

    async updateSubscription(req: UpdateSubscription) {
        
        const subscription = await this.prisma.subscriptions.update({
            where: { user_id: req.user_id },
            data: { 
                email: req.email, 
                subscription_status: req.subscription_status 
            }
        })

        if( !subscription ) 
            throw this.messages.updateSubscriptionError()

        return this.messages.subscriptionUpdated()

    }

    async downSubscription(req: DownSubscription) {
        
        const subscription = await this.prisma.subscriptions.update({
            where: { user_id: req.user_id },
            data: { 
                email: req.email, 
                subscription_status: 'down',
                down_date: new Date().toISOString(),
                down_reason: req.down_reason
            }
        })

        if( !subscription ) 
            throw this.messages.downSubscriptionError()

        return this.messages.subscriptionDowned()

    }

}
