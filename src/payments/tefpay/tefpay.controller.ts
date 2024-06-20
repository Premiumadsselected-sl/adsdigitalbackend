import { Controller, Post, Body, Patch, Delete, UseGuards } from '@nestjs/common'
import { TefpayService } from './tefpay.service'
import { TefpayDto } from './dto/tefpay.dto'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { MessagesService } from 'src/utils/messages'
import { AuthGuard } from 'src/auth/guards/auth.guard'

@Controller('payments')
@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class TefpayController {
  
  constructor(
    private readonly tefpayService: TefpayService,
    private readonly messages: MessagesService
  ) {}

  @Post('payment-flow')
  @ApiOperation({ summary: 'Payment Flow' })
  @ApiBody({ type: TefpayDto })
  paymentFlow(@Body() req: TefpayDto) {
    try {
      return this.tefpayService.paymentFlow(req)
    } catch ( error ) {
      return this.messages.internalServerError()
    }
    
  }

  @Post('find-all')
  @ApiOperation({ summary: 'Find All Payments' })
  @ApiBody({ type: TefpayDto })
  findAll() {
    try {
      return this.tefpayService.findAll()
    } catch ( error ) {
      return this.messages.internalServerError()
    }
  }

  @Post('find-one')
  @ApiOperation({ summary: 'Find One Payment' })
  @ApiBody({ type: TefpayDto })
  findOne(@Body() req: TefpayDto) {
    try {
      return this.tefpayService.findOne(req)
    } catch ( error ) {
      return this.messages.internalServerError()
    }
  }

  @Patch('update')
  @ApiOperation({ summary: 'Update Payment' })
  @ApiBody({ type: TefpayDto })
  update(@Body() req: TefpayDto) {
    try {
      return this.tefpayService.update(req)
    } catch ( error ) {
      return this.messages.internalServerError()
    }
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete Payment' })
  @ApiBody({ type: TefpayDto })
  remove(@Body() req: TefpayDto) {
    try {
      return this.tefpayService.remove(req)
    } catch ( error ) {
      return this.messages.internalServerError()
    }
  }

}
