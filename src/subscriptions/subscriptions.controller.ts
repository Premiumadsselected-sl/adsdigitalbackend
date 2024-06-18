import { Controller, Post, Put, Body, Patch, Get, Delete } from '@nestjs/common'
import { 
GetSubscriptionDto, 
validateSubscription, 
CreateSubscriptionDto,
UpdateSubscription,
DownSubscription
} from 'src/dto/subscriptions.dto'
import { SubscriptionsService } from './subscriptions.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('subscriptions')
@ApiTags('Subscriptions')
export class SubscriptionsController {

    constructor( private readonly subscriptionService: SubscriptionsService ) {}

    @Get('get-subscription')
    @ApiOperation({ summary: 'Get Subscription' })
    getSubscription(@Body() req: GetSubscriptionDto) {
        return this.subscriptionService.getSubscription(req)
    }

    @Post('validate-subscription')
    @ApiOperation({ summary: 'Validate Subscription' })
    validateSubscription(@Body() req: validateSubscription) {
        return this.subscriptionService.validateSubscription(req)
    }

    @Put('create-subscription')
    @ApiOperation({ summary: 'Create Subscription' })
    createSubscription(@Body() req: CreateSubscriptionDto) {
        return this.subscriptionService.createSubscription(req)
    }

    @Patch('update-subscription')
    @ApiOperation({ summary: 'Update Subscription' })
    updateSubscription(@Body() req: UpdateSubscription) {
        return this.subscriptionService.updateSubscription(req)
    }

    @Delete('down-subscription')
    @ApiOperation({ summary: 'Down Subscription' })
    downSubscription(@Body() req: DownSubscription) {
        return this.subscriptionService.downSubscription(req)
    }
    
}
