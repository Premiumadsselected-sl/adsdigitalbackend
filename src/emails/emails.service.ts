import { Injectable } from '@nestjs/common'
import { EmailDto } from './dto/email.dto'
import { PrismaService } from 'src/prisma.service'
import { MessagesService } from 'src/utils/messages'

@Injectable()
export class EmailsService extends MessagesService{

  constructor(
    private prisma: PrismaService,
    private messages: MessagesService
  ) { super() }
  
  async create(req: EmailDto) {
    
    try {
      
      const email = await this.prisma.emails.create({
        data: {
          user_id: req.user_id,
          user_name: req.user_name,
          email: req.email,
          email_status: req.email_status,
          email_code: req.email_code,
          email_date: req.email_date,
          email_subject: req.email_subject,
          email_body: req.email_body,
          email_response: req.email_response,
          email_error: req.email_error
        }
      })

      if(email['statusCode'] !== 200) 
        throw email
      
      return this.messages.emailCreated()

    }

    catch (error) {
      return this.messages.internalServerError(error)
    }

  }

  findAll() {
    
    try {
      
      const emails = this.prisma.emails.findMany()

      if(emails['statusCode'] !== 200) 
        throw emails
      
      return emails

    }

    catch (error) {
      return this.messages.internalServerError(error)
    }

  }

  findOne(req: EmailDto) {
    
    try {
      
      const email = this.prisma.emails.findUnique({
        where: {
          id: req.user_id
        }
      })

      if(email['statusCode'] !== 200) 
        throw email
      
      return email

    }

    catch (error) {
      return this.messages.internalServerError(error)
    }

  }

  remove(req: EmailDto) {
      
      try {
        
        const email = this.prisma.emails.delete({
          where: {
            id: req.user_id
          }
        })
  
        if(email['statusCode'] !== 200) 
          throw email
        
        return this.messages.emailDeleted()
  
      }
  
      catch (error) {
        return this.messages.internalServerError(error)
      }

  }

}
