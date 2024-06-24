import { 
Controller, 
Post,
Put,
Body,
Patch,
Delete,
UseGuards,
} from '@nestjs/common'
import { 
GetSubscriptionDto, 
validateSubscription, 
CreateSubscriptionDto,
UpdateSubscription,
DownSubscription
} from 'src/dto/subscriptions.dto'
import { SubscriptionsService } from './subscriptions.service'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { MessagesService } from 'src/utils/messages'
import { AuthGuard } from 'src/auth/guards/auth.guard'
import { AdminGuard } from 'src/auth/guards/admin.guard'
import { SubscriptionGuard } from 'src/auth/guards/subscription.guard'

@Controller('subscriptions')
@ApiTags('👁‍🗨 Subscriptions')
@ApiBearerAuth()
export class SubscriptionsController {

    constructor( 
        private readonly subscriptionService: SubscriptionsService,
        private readonly messages: MessagesService
    ) {}

    @Post('get-subscription')
    @UseGuards(AuthGuard, SubscriptionGuard)
    @ApiOperation({ summary: 'Get Subscription' })
    @ApiBody({ type: GetSubscriptionDto })
    @ApiResponse({ status: 400, description: 'Bad request. Please check your information.'})
    @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to access subscriptions.'}) 
    @ApiResponse({ status: 404, description: 'Not found. Subscription not found for the user.'})
    @ApiResponse({ status: 200, description: 'Subscription retrieved successfully. Response contains subscription data.'})
    getSubscription(@Body() req: GetSubscriptionDto) {
        try { return this.subscriptionService.getSubscription(req) } 
        catch ( error ) {
            return this.messages.internalServerError()
        }
    }

    @Post('validate-subscription')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Validate Subscription' })
    @ApiBody({ type: validateSubscription })
    @ApiResponse({ status: 400, description: 'Bad request. Please check your information.'})
    @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to validate subscriptions.'}) 
    @ApiResponse({ status: 404, description: 'Not found. Subscription not found.'})
    @ApiResponse({ status: 200, description: 'Subscription validation successful. Response contains validation data.'})
    validateSubscription(@Body() req: validateSubscription ) {
        try { return this.subscriptionService.validateSubscription(req) } 
        catch ( error ) {
            return this.messages.internalServerError()
        }
    }

    @Put('create-subscription')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Create Subscription' })
    @ApiBody({ type: CreateSubscriptionDto })
    @ApiResponse({ status: 400, description: 'Bad request. Please check your information.'})
    @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to create subscriptions.'}) 
    @ApiResponse({ status: 409, description: 'Conflict. Subscription already exists for the user.'}) 
    @ApiResponse({ status: 201, description: 'Subscription created successfully. Response contains subscription data.'})
    createSubscription(@Body() req: CreateSubscriptionDto) {
        try { return this.subscriptionService.createSubscription(req) } 
        catch ( error ) {
            return this.messages.internalServerError()
        }
    }

    @Patch('update-subscription')
    @UseGuards(AdminGuard)
    @ApiOperation({ summary: 'Update Subscription' })
    @ApiBody({ type: UpdateSubscription })
    @ApiResponse({ status: 400, description: 'Bad request. Please check your information.'})
    @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to update subscriptions.'}) 
    @ApiResponse({ status: 404, description: 'Not found. Subscription not found.'})
    @ApiResponse({ status: 200, description: 'Subscription updated successfully. Response contains updated subscription data.'})
    updateSubscription(@Body() req: UpdateSubscription) {
        try { return this.subscriptionService.updateSubscription(req) } 
        catch ( error ) {
            return this.messages.internalServerError()
        }
    }

    @Delete('down-subscription')
    @UseGuards(AuthGuard, SubscriptionGuard)
    @ApiOperation({ summary: 'Down Subscription' })
    @ApiBody({ type: DownSubscription })
    @ApiResponse({ status: 400, description: 'Bad request. Please check your information.'})
    @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to down subscriptions.'}) 
    @ApiResponse({ status: 404, description: 'Not found. Subscription not found.'})
    @ApiResponse({ status: 200, description: 'Subscription down successfully.'})
    downSubscription(@Body() req: DownSubscription) {
        try { return this.subscriptionService.downSubscription(req) } 
        catch ( error ) {
            return this.messages.internalServerError()
        }
    }
    
}