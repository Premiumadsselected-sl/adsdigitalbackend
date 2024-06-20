import { Controller, Post, Body, Delete, UseGuards } from '@nestjs/common'
import { EmailsService } from './emails.service'
import { EmailDto } from './dto/email.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AdminGuard } from 'src/auth/guards/admin.guard'

@Controller('emails')
@ApiTags('Emails')
@UseGuards(AdminGuard)
@ApiBearerAuth()
export class EmailsController {
  
  constructor(private readonly emailsService: EmailsService) {}

  @Post('create-email')
  @ApiOperation({ summary: 'Create Email' })
  create(@Body() createEmailDto: EmailDto) {
    return this.emailsService.create(createEmailDto)
  }

  @Post('get-emails')
  @ApiOperation({ summary: 'Get Emails' })
  findAll() {
    return this.emailsService.findAll()
  }

  @Post('get-email')
  @ApiOperation({ summary: 'Get Email' })
  findOne(@Body() req: EmailDto) {
    return this.emailsService.findOne(req)
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Email' })
  remove(@Body() req: EmailDto) {
    return this.emailsService.remove(req)
  }

}
