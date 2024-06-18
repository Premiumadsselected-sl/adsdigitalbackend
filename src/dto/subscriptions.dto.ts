import { SubscriptionEntitie } from '../entities/subscriptions'

export class CreateSubscriptionDto extends SubscriptionEntitie {
    user_id: SubscriptionEntitie['user_id']
    user_name: SubscriptionEntitie['user_name']
    email: SubscriptionEntitie['email']
    subscription_code: SubscriptionEntitie['subscription_code']

}

export class GetSubscriptionDto extends SubscriptionEntitie {
    user_id: SubscriptionEntitie['user_id']
    email: SubscriptionEntitie['email']

}

export class validateSubscription extends SubscriptionEntitie {  
    user_id: SubscriptionEntitie['user_id']
    email: SubscriptionEntitie['email']

}

export class UpdateSubscription extends SubscriptionEntitie {   
    user_id: SubscriptionEntitie['user_id']
    email: SubscriptionEntitie['email']
    subscription_status: SubscriptionEntitie['subscription_status']
    
}

export class DownSubscription extends SubscriptionEntitie {        
    user_id: SubscriptionEntitie['user_id']
    email: SubscriptionEntitie['email']
    down_reason: SubscriptionEntitie['down_reason']
    
}