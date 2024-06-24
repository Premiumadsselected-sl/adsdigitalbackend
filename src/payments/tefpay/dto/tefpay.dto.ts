import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsEmail, IsOptional,
IsNumber, IsObject,
Length} from 'class-validator'

export class PaymentFlowDto{
   
    @IsOptional()
    @IsString()
    @ApiProperty()
    user_id?: string

    @IsString()
    @ApiProperty()
    payment_code: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string

}

export class FindAllPaymentsDto{
    @IsNumber()
    @IsNotEmpty()
    @Length(1, 100)
    init: number

    @IsNumber()
    @IsNotEmpty()
    @Length(1, 100)
    limit: number
}

export class FindOneDto{
    
    @IsOptional()
    @IsString()
    @ApiProperty()
    user_id?: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string

}

export class UpdateDto{


    @IsOptional()
    @IsString()
    @ApiProperty()
    user_id?: string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    user_name?: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string
    
    @IsOptional()
    @IsString()
    @ApiProperty()
    payment_status?: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    payment_date?: string

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    payment_amount?: number

    @IsOptional()
    @IsString()
    @ApiProperty()
    payment_currency?: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    payment_method?: string

    @IsOptional()
    @IsString() 
    @ApiProperty()
    payment_details?: string

    @IsOptional()
    @IsObject()
    @ApiProperty()
    payment_response?: object

    @IsOptional()
    @IsObject()
    @ApiProperty()
    payment_error?: object

    @IsOptional()
    @IsObject()
    @ApiProperty()
    payment_refund?: object

    @IsOptional()
    @IsString()
    @ApiProperty()
    payment_refund_date?: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    payment_refund_reason?: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    payment_refund_status?: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    payment_refund_code?: string

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    payment_refund_amount?: number

    @IsOptional()
    @IsString()
    @ApiProperty()
    payment_refund_currency?: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    payment_refund_method?: string

    @IsOptional()
    @IsObject()
    @ApiProperty()
    payment_refund_details?: object

    @IsOptional()
    @IsObject()
    @ApiProperty()
    payment_refund_response?: object

    @IsOptional()
    @IsObject()
    @ApiProperty()
    payment_refund_error?: object

    @IsOptional()
    @IsString()
    @ApiProperty()
    payment_logs?: object

}

export class RemoveDto{
    
    @IsOptional()
    @IsString()
    @ApiProperty()
    user_id?: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string
}

