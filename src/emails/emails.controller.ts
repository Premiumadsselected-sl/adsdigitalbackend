import { Controller, Post, Body, Delete, UseGuards } from '@nestjs/common'
import { EmailsService } from './emails.service'
import { CreateEmailTdo, FindAllEmailsTdo, FindOneEmailTdo,
RemoveEmailTdo } from './dto/email.dto'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AdminGuard } from 'src/auth/guards/admin.guard'

@Controller('emails')
@ApiTags('📨 Emails')
@UseGuards(AdminGuard)
@ApiBearerAuth()
export class EmailsController {
  
  constructor(private readonly emailsService: EmailsService) {}

  @Post('create-email')
  @ApiOperation({ summary: 'Create Email' })
  @ApiBody({ type: CreateEmailTdo })
  @ApiResponse({ status: 201, description: 'Email created successfully.'}) 
  @ApiResponse({ status: 400, description: 'Bad request. Please check your email data.'}) 
  @ApiResponse({ status: 422, description: 'Unprocessable entity. Email data is invalid.'}) 
  @ApiResponse({ status: 500, description: 'Internal server error. An error occurred during email creation.'}) 
  create(@Body() req: CreateEmailTdo) {
    return this.emailsService.create(req)
  }

  @Post('get-emails')
  @ApiOperation({ summary: 'Get Emails' })
  @ApiBody({ type: FindAllEmailsTdo, required: false }) 
  @ApiResponse({ status: 200, description: 'Emails retrieved successfully. Response contains an array of email data.'})
  @ApiResponse({ status: 400, description: 'Bad request. Please check your filtering criteria.'}) 
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to access email data.'}) 
  @ApiResponse({ status: 403, description: 'Forbidden. User does not have permission to view all emails.'}) 
  findAll(@Body() req: FindAllEmailsTdo) {
    return this.emailsService.findAll(req)
  }

  @Post('get-email')
  @ApiOperation({ summary: 'Get Email' })
  @ApiBody({ type: FindOneEmailTdo })
  @ApiResponse({ status: 200, description: 'Email retrieved successfully. Response contains email data.'})
  @ApiResponse({ status: 400, description: 'Bad request. Please check your email ID.'}) 
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to access this email.'}) 
  @ApiResponse({ status: 403, description: 'Forbidden. User does not have permission to view this email.'}) 
  @ApiResponse({ status: 404, description: 'Not found. Email not found.'}) 
  findOne(@Body() req: FindOneEmailTdo) {
    return this.emailsService.findOne(req)
  }

  @Delete()
  @ApiOperation({ summary: 'Delete Email' })
  @ApiBody({ type: RemoveEmailTdo })
  @ApiResponse({ status: 200, description: 'Email deleted successfully.'})
  @ApiResponse({ status: 400, description: 'Bad request. Please check your email ID.'}) 
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to delete email.'}) 
  @ApiResponse({ status: 403, description: 'Forbidden. User does not have permission to delete this email.'}) 
  @ApiResponse({ status: 404, description: 'Not found. Email not found.'}) 
  remove(@Body() req: RemoveEmailTdo) {
    return this.emailsService.remove(req)
  }


}
