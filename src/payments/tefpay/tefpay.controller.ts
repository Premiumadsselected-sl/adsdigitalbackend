import { Controller, Post, Body, Patch, Delete } from '@nestjs/common'
import { TefpayService } from './tefpay.service'
import { TefpayDto } from './dto/tefpay.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { MessagesService } from 'src/utils/messages'

@Controller('payments')
@ApiTags('Payments')
export class TefpayController {
  
  constructor(
    private readonly tefpayService: TefpayService,
    private readonly messages: MessagesService
  ) {}

  @Post('payment-flow')
  @ApiOperation({ summary: 'Payment Flow' })
  paymentFlow(@Body() req: TefpayDto) {
    try {
      return this.tefpayService.paymentFlow(req)
    } catch ( error ) {
      return this.messages.internalServerError(error)
    }
    
  }

  @Post('find-all')
  @ApiOperation({ summary: 'Find All Payments' })
  findAll() {
    try {
      return this.tefpayService.findAll()
    } catch ( error ) {
      return this.messages.internalServerError(error)
    }
  }

  @Post('find-one')
  @ApiOperation({ summary: 'Find One Payment' })
  findOne(@Body() req: TefpayDto) {
    try {
      return this.tefpayService.findOne(req)
    } catch ( error ) {
      return this.messages.internalServerError(error)
    }
  }

  @Patch('update')
  @ApiOperation({ summary: 'Update Payment' })
  update(@Body() req: TefpayDto) {
    try {
      return this.tefpayService.update(req)
    } catch ( error ) {
      return this.messages.internalServerError(error)
    }
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete Payment' })
  remove(@Body() req: TefpayDto) {
    try {
      return this.tefpayService.remove(req)
    } catch ( error ) {
      return this.messages.internalServerError(error)
    }
  }

}
