import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional, IsString, Length, IsNotEmpty, IsEmail, IsBoolean, IsObject } from 'class-validator'
// import { UserEntitie } from '../entities/users'

export class LoginDto {
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({ required: true, description: "User's email address." })
    email: string

    @Transform(({ value }) => value.trim())
    @IsOptional()
    @IsString()
    @Length(6, 20)
    @ApiProperty({ required: false, description: "User's password (optional)." })
    password?: string

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, description: "Remember me for future logins (optional)." })
    remember_me?: boolean
}

export class LogoutDto {
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({ required: true, description: "User's email address." })
    email: string
}

export class RegisterDto {
    @Transform(({ value }) => value.trim())
    @IsOptional()
    @IsString()
    @Length(3, 100)
    @ApiProperty({ required: false, description: "User's name (optional)." })
    user_name?: string

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({ required: true, description: "User's email address." })
    email: string

    @Transform(({ value }) => value.trim())
    @IsOptional()
    @IsString()
    @Length(6, 20)
    @ApiProperty({ required: false, description: "User's password (optional)." })
    password?: string

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, description: "Remember me for future logins (optional)." })
    remember_me?: boolean
}

export class GetUserDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: "User ID (optional)." })
    id?: string

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({ required: true, description: "User's email address." })
    email: string
}

export class GetUserProfileDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: "User ID (optional)." })
    id?: string

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({ required: true, description: "User's email address." })
    email: string
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: "User ID (optional)." })
    id?: string

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({ required: true, description: "User's email address." })
    email: string

    @Transform(({ value }) => value.trim())
    @IsOptional()
    @IsString()
    @Length(3, 100)
    @ApiProperty({ required: false, description: "User's name (optional)." })
    user_name?: string
}

export class UpdateUserProfileDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: "User ID (optional)." })
    id?: string

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({ required: true, description: "User's email address." })
    email: string

    @Transform(({ value }) => value.trim())
    @IsOptional()
    @IsString()
    @Length(3, 100)
    @ApiProperty({ required: false, description: "User's name (optional)." })
    user_name?: string
}

export class DeleteUserDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: "User ID (optional)." })
    id?: string
    
    @Transform( ({value}) => value.trim() )
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({ required: true })
    email: string

}

export class ForgotPasswordDto {
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({ required: true, description: "User's email address." })
    email: string

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: "User's preferred language (optional)." })
    locale?: string

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: "User's password reset token (optional)." })
    user_password_token?: string

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: "Email styling information (optional)." })
    user_service_emails_styles?: string

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: "User service domain URL (optional)." })
    user_service_domain_url?: string

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: "User service support email address (optional)." })
    user_service_support_email?: string

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: "User service name (optional)." })
    user_service_name?: string
}

export class ChangePasswordDto {
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({ required: true, description: "User's email address." })
    email: string

    @Transform(({ value }) => value.trim())
    @IsOptional()
    @IsString()
    @Length(6, 20)
    @ApiProperty({ required: false, description: "User's new password (optional)." })
    password?: string
}

export class SetUserDataDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: "User ID (optional)." })
    id?: string

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({ required: true, description: "User's email address." })
    email: string

    @IsOptional()
    @IsObject()
    @ApiProperty({ required: false, description: "Additional user data (optional)." })
    user_data: object
}

export class GetUserDataDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: "User ID (optional)." })
    id?: string

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({ required: true, description: "User's email address." })
    email: string
}

export class UpdateUserDataDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: "User ID (optional)." })
    id?: string

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({ required: true, description: "User's email address." })
    email: string

    @IsOptional()
    @IsObject()
    @ApiProperty({ required: false, description: "Updated user data (optional)." })
    user_data?: object 
}