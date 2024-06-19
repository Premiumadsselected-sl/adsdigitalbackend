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
import { MessagesService } from 'src/utils/messages'

@Controller('subscriptions')
@ApiTags('Subscriptions')
export class SubscriptionsController {

    constructor( 
        private readonly subscriptionService: SubscriptionsService,
        private readonly messages: MessagesService
    ) {}

    @Get('get-subscription')
    @ApiOperation({ summary: 'Get Subscription' })
    getSubscription(@Body() req: GetSubscriptionDto) {
        try {
            return this.subscriptionService.getSubscription(req)
        } catch ( error ) {
            return this.messages.internalServerError(error)
        }
    }

    @Post('validate-subscription')
    @ApiOperation({ summary: 'Validate Subscription' })
    validateSubscription(@Body() req: validateSubscription) {
        try {
            return this.subscriptionService.validateSubscription(req)
        } catch ( error ) {
            return this.messages.internalServerError(error)
        }
    }

    @Put('create-subscription')
    @ApiOperation({ summary: 'Create Subscription' })
    createSubscription(@Body() req: CreateSubscriptionDto) {
        try {
            return this.subscriptionService.createSubscription(req)
        } catch ( error ) {
            return this.messages.internalServerError(error)
        }
    }

    @Patch('update-subscription')
    @ApiOperation({ summary: 'Update Subscription' })
    updateSubscription(@Body() req: UpdateSubscription) {
        try {
            return this.subscriptionService.updateSubscription(req)
        } catch ( error ) {
            return this.messages.internalServerError(error)
        }
    }

    @Delete('down-subscription')
    @ApiOperation({ summary: 'Down Subscription' })
    downSubscription(@Body() req: DownSubscription) {
        try {
            return this.subscriptionService.downSubscription(req)
        } catch ( error ) {
            return this.messages.internalServerError(error)
        }
    }
    
}
