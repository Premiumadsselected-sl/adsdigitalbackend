
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsEmail, Length, IsOptional,
IsNumber, IsBoolean} from 'class-validator'
import { Transform } from 'class-transformer'

export class UserEntitie {
    
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    protected id?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: false })
    protected token?: string
    
    @Transform( ({value}) => value.trim() )
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    @ApiProperty({ required: false })
    protected user_name?: string

    @Transform( ({value}) => value.trim() )
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({ required: true })
    protected email?: string

    @Transform( ({value}) => value.trim() )
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(6, 20)
    @ApiProperty({ required: false })
    protected password?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: false })
    protected status?: string

    @IsOptional()                   
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: false })
    protected locale?: string

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ required: false })
    protected start?: number
    
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ required: false })
    protected limit?: number

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false })
    protected remember_me?: boolean

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: false })
    protected user_data?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: false })
    protected user_password_token?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: false })
    protected user_service_emails_styles?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: false })
    protected user_service_domain_url?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: false })
    protected user_service_support_email?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: false })
    protected user_service_name?: string

}