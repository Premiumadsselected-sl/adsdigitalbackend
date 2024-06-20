import { Controller, Post, Put, Body, Patch, Get, Delete, UseGuards, Query } from '@nestjs/common'
import { 
GetSubscriptionDto, 
validateSubscription, 
CreateSubscriptionDto,
UpdateSubscription,
DownSubscription
} from 'src/dto/subscriptions.dto'
import { SubscriptionsService } from './subscriptions.service'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { MessagesService } from 'src/utils/messages'
import { AuthGuard } from 'src/auth/guards/auth.guard'
import { AdminGuard } from 'src/auth/guards/admin.guard'
import { SubscriptionGuard } from 'src/auth/guards/subscription.guard'

@Controller('subscriptions')
@ApiTags('Subscriptions')
@ApiBearerAuth()
export class SubscriptionsController {

    constructor( 
        private readonly subscriptionService: SubscriptionsService,
        private readonly messages: MessagesService
    ) {}

    @Get('get-subscription')
    @UseGuards(AuthGuard, SubscriptionGuard)
    @ApiOperation({ summary: 'Get Subscription' })
    @ApiQuery({ type: GetSubscriptionDto, required: false })
    getSubscription(@Query('req') req: GetSubscriptionDto) {
        try {
            return this.subscriptionService.getSubscription(req)
        } catch ( error ) {
            return this.messages.internalServerError()
        }
    }

    @Post('validate-subscription')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Validate Subscription' })
    @ApiBody({ type: validateSubscription })
    validateSubscription(@Body() req: validateSubscription) {
        try {
            return this.subscriptionService.validateSubscription(req)
        } catch ( error ) {
            return this.messages.internalServerError()
        }
    }

    @Put('create-subscription')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Create Subscription' })
    @ApiBody({ type: CreateSubscriptionDto })
    createSubscription(@Body() req: CreateSubscriptionDto) {
        try {
            return this.subscriptionService.createSubscription(req)
        } catch ( error ) {
            return this.messages.internalServerError()
        }
    }

    @Patch('update-subscription')
    @UseGuards(AdminGuard)
    @ApiOperation({ summary: 'Update Subscription' })
    @ApiBody({ type: UpdateSubscription })
    updateSubscription(@Body() req: UpdateSubscription) {
        try {
            return this.subscriptionService.updateSubscription(req)
        } catch ( error ) {
            return this.messages.internalServerError()
        }
    }

    @Delete('down-subscription')
    @UseGuards(AuthGuard, SubscriptionGuard)
    @ApiOperation({ summary: 'Down Subscription' })
    @ApiBody({ type: DownSubscription })
    downSubscription(@Body() req: DownSubscription) {
        try {
            return this.subscriptionService.downSubscription(req)
        } catch ( error ) {
            return this.messages.internalServerError()
        }
    }
    
}
