import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator"
//import { EmailEntitie } from "../entities/email.entity"

export class CreateEmailTdo{

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

    @IsString()
    @IsNotEmpty()
    email_response: string

    @IsString()
    @IsNotEmpty()
    email_error: string

}

export class FindAllEmailsTdo{
    @IsNumber()
    @IsNotEmpty()
    @Length(1, 100)
    init: number

    @IsNumber()
    @IsNotEmpty()
    @Length(1, 100)
    limit: number
}

export class FindOneEmailTdo{
    @IsString()
    @IsNotEmpty()
    email: string
}

export class RemoveEmailTdo{
    @IsString()
    @IsNotEmpty()
    email: string
}




