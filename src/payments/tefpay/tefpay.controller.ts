import { Controller, Post, Body, Patch, Delete, UseGuards } from '@nestjs/common'
import { TefpayService } from './tefpay.service'
import { PaymentFlowDto, FindAllPaymentsDto, FindOneDto, UpdateDto, RemoveDto } from './dto/tefpay.dto'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { MessagesService } from 'src/utils/messages'
import { AuthGuard } from 'src/auth/guards/auth.guard'

@Controller('payments')
@ApiTags('💳 Payments')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class TefpayController {
  
  constructor(
    private readonly tefpayService: TefpayService,
    private readonly messages: MessagesService
  ) {}

  @Post('payment-flow')
  @ApiOperation({ summary: 'Payment Flow' })
  @ApiBody({ type: PaymentFlowDto })
  @ApiResponse({ status: 400, description: 'Bad request. Please check your information.'})
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to initiate payment flow.'}) 
  @ApiResponse({ status: 403, description: 'Forbidden. User does not have permission to perform this action.'}) 
  @ApiResponse({ status: 422, description: 'Unprocessable entity. Payment data is invalid.'}) 
  @ApiResponse({ status: 500, description: 'Internal server error. An error occurred during payment processing.'}) 
  @ApiResponse({ status: 200, description: 'Payment flow initiated successfully. Response contains payment details.'})
  paymentFlow(@Body() req: PaymentFlowDto) {
    try {
      return this.tefpayService.paymentFlow(req)
    } catch (error) {
      return this.messages.internalServerError()
    }
  }

  @Post('find-all')
  @ApiOperation({ summary: 'Find All Payments' })
  @ApiBody({ type: FindAllPaymentsDto, required: false }) 
  @ApiResponse({ status: 400, description: 'Bad request. Please check your filtering criteria.'}) 
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to access payment data.'}) 
  @ApiResponse({ status: 403, description: 'Forbidden. User does not have permission to view all payments.'}) 
  @ApiResponse({ status: 200, description: 'Payments retrieved successfully. Response contains an array of payment data.'})
  findAll(@Body() req: FindAllPaymentsDto) {
    try {
      return this.tefpayService.findAll(req)
    } catch (error) {
      return this.messages.internalServerError()
    }
  }

  @Post('find-one')
  @ApiOperation({ summary: 'Find One Payment' })
  @ApiBody({ type: FindOneDto })
  @ApiResponse({ status: 400, description: 'Bad request. Please check your payment ID.'}) 
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to access payment data.'}) 
  @ApiResponse({ status: 403, description: 'Forbidden. User does not have permission to view this payment.'}) 
  @ApiResponse({ status: 404, description: 'Not found. Payment not found.'}) 
  @ApiResponse({ status: 200, description: 'Payment retrieved successfully. Response contains payment data.'})
  findOne(@Body() req: FindOneDto) {
    try {
      return this.tefpayService.findOne(req)
    } catch (error) {
      return this.messages.internalServerError()
    }
  }

  @Patch('update')
  @ApiOperation({ summary: 'Update Payment' })
  @ApiBody({ type: UpdateDto })
  @ApiResponse({ status: 400, description: 'Bad request. Please check your update data.'}) 
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to update payment.'}) 
  @ApiResponse({ status: 403, description: 'Forbidden. User does not have permission to update this payment.'}) 
  @ApiResponse({ status: 404, description: 'Not found. Payment not found.'}) 
  @ApiResponse({ status: 200, description: 'Payment updated successfully. Response contains updated payment data.'})
  update(@Body() req: UpdateDto) {
    try {
      return this.tefpayService.update(req)
    } catch (error) {
      return this.messages.internalServerError()
    }
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete Payment' })
  @ApiBody({ type: RemoveDto })
  @ApiResponse({ status: 400, description: 'Bad request. Please check your payment ID.'}) 
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to delete payment.'}) 
  @ApiResponse({ status: 403, description: 'Forbidden. User does not have permission to delete this payment.'}) 
  @ApiResponse({ status: 404, description: 'Not found. Payment not found.'}) 
  @ApiResponse({ status: 200, description: 'Payment deleted successfully.'})
  remove(@Body() req: RemoveDto) {
    try {
      return this.tefpayService.remove(req)
    } catch (error) {
      return this.messages.internalServerError()
    }
  }


}
