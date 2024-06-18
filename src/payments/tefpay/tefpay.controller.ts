import { Controller, Post, Body, Patch, Delete } from '@nestjs/common'
import { TefpayService } from './tefpay.service'
import { TefpayDto } from './dto/tefpay.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('payments')
@ApiTags('Payments')
export class TefpayController {
  constructor(private readonly tefpayService: TefpayService) {}

  @Post('payment-flow')
  @ApiOperation({ summary: 'Payment Flow' })
  paymentFlow(@Body() req: TefpayDto) {
    return this.tefpayService.paymentFlow(req)
  }

  @Post('find-all')
  @ApiOperation({ summary: 'Find All Payments' })
  findAll() {
    return this.tefpayService.findAll()
  }

  @Post('find-one')
  @ApiOperation({ summary: 'Find One Payment' })
  findOne(@Body() req: TefpayDto) {
    return this.tefpayService.findOne(req)
  }

  @Patch('update')
  @ApiOperation({ summary: 'Update Payment' })
  update(@Body() req: TefpayDto) {
    return this.tefpayService.update(req)
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete Payment' })
  remove(@Body() req: TefpayDto) {
    return this.tefpayService.remove(req)
  }

}
