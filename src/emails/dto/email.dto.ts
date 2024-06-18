import { EmailEntitie } from "../entities/email.entity"

export class EmailDto {

    user_id: string
    user_name: string
    email: string
    email_status: string
    email_code: string
    email_date: string
    email_subject: string
    email_body: string
    email_response: object
    email_error: string
    email_logs: object

    constructor(email: EmailEntitie) {
        this.user_id = email.user_id
        this.user_name = email.user_name
        this.email = email.email
        this.email_status = email.email_status
        this.email_code = email.email_code
        this.email_date = email.email_date
        this.email_subject = email.email_subject
        this.email_body = email.email_body
        this.email_response = email.email_response
        this.email_error = email.email_error
    }

    public static toDto(email: EmailEntitie): EmailDto {
        return new EmailDto(email)
    }

    public static toDtos(emails: EmailEntitie[]): EmailDto[] {
        return emails.map(email => EmailDto.toDto(email))
    }

    public static toEntity(emailDto: EmailDto): EmailEntitie {
        return {
            user_id: emailDto.user_id,
            user_name: emailDto.user_name,
            email: emailDto.email,
            email_status: emailDto.email_status,
            email_code: emailDto.email_code,
            email_date: emailDto.email_date,
            email_subject: emailDto.email_subject,
            email_body: emailDto.email_body,
            email_response: emailDto.email_response,
            email_error: emailDto.email_error
        }
    }

    public static toEntities(emailDtos: EmailDto[]): EmailEntitie[] {
        return emailDtos.map(emailDto => EmailDto.toEntity(emailDto))
    }
    
}
