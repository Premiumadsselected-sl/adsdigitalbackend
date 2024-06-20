import {
CanActivate,
ExecutionContext,
Injectable,
UnauthorizedException
}from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service'

export enum SubscriptionStatus {
  down = 'down',
  canceled = 'canceled',
  active = 'active',
  trial = 'trial',
  pending = 'pending',
}
  
@Injectable()
export class SubscriptionGuard implements CanActivate {
    
    constructor(
        private readonly jwtService: JwtService,
        private readonly subscriptionsService: SubscriptionsService
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      
      const req = context.switchToHttp().getRequest()
      const token = this.extractTokenFromHeader(req) 
  
      if (!token) {
        throw new UnauthorizedException()
      }

      const subscription = 
      await this.subscriptionsService.validateSubscription({
        user_id: req.user.email,
        email: req.email,
      })

      if( !subscription )                 
        throw new UnauthorizedException()

      const validStatuses = [
        SubscriptionStatus.active,
        SubscriptionStatus.trial,
        SubscriptionStatus.pending
      ]

      if (!validStatuses.includes(subscription.status as SubscriptionStatus)) {
        throw {
          status: subscription.status,
          ...new UnauthorizedException()
        }
      }

      try {
        
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.API_JWT_SECRET,
        })

        req.user = payload

      } 
    
      catch {
        throw new UnauthorizedException()
      }

      return true
    
  }

  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }

}











      