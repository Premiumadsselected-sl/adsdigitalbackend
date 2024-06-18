import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsEmail, IsOptional,
IsNumber, IsObject} from 'class-validator'

export class TefpayDto {

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    id?: number
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    user_id?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    user_name?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    payment_status?: string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    payment_code: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    payment_date?: string

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    payment_amount?: number

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    payment_currency?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    payment_method?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString() 
    @ApiProperty()
    payment_details?: string

    @IsOptional()
    @IsNotEmpty()
    @IsObject()
    @ApiProperty()
    payment_response?: object

    @IsOptional()
    @IsNotEmpty()
    @IsObject()
    @ApiProperty()
    payment_error?: object

    @IsOptional()
    @IsNotEmpty()
    @IsObject()
    @ApiProperty()
    payment_refund?: object

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    payment_refund_date?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    payment_refund_reason?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    payment_refund_status?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    payment_refund_code?: string

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    payment_refund_amount?: number

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    payment_refund_currency: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    payment_refund_method: string

    @IsOptional()
    @IsNotEmpty()
    @IsObject()
    @ApiProperty()
    payment_refund_details: object

    @IsOptional()
    @IsNotEmpty()
    @IsObject()
    @ApiProperty()
    payment_refund_response: object

    @IsOptional()
    @IsNotEmpty()
    @IsObject()
    @ApiProperty()
    payment_refund_error: object

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    payment_logs: object

}
