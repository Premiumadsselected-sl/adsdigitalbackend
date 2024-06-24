import { IsString, IsNotEmpty,
IsObject} from 'class-validator'

export class EmailEntitie {

    @IsString()
    @IsNotEmpty()
    user_id: string

    @IsString()
    @IsNotEmpty()
    user_name: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    email_status: string

    @IsString()
    @IsNotEmpty()
    email_code: string
    
    @IsString()
    @IsNotEmpty()
    email_date: string

    @IsString()
    @IsNotEmpty()
    email_subject: string

    @IsString()
    @IsNotEmpty()
    email_body: string

    @IsObject()
    @IsNotEmpty()
    email_response: object

    @IsString()
    @IsNotEmpty()
    email_error: string

}
