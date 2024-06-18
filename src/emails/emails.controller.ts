import { Controller, Post, Body, Delete } from '@nestjs/common'
import { EmailsService } from './emails.service'
import { EmailDto } from './dto/email.dto'

@Controller('emails')
export class EmailsController {
  
  constructor(private readonly emailsService: EmailsService) {}

  @Post('create-email')
  create(@Body() createEmailDto: EmailDto) {
    return this.emailsService.create(createEmailDto)
  }

  @Post('get-emails')
  findAll() {
    return this.emailsService.findAll()
  }

  @Post('get-email')
  findOne(@Body() req: EmailDto) {
    return this.emailsService.findOne(req)
  }

  @Delete()
  remove(@Body() req: EmailDto) {
    return this.emailsService.remove(req)
  }

}
