import { IsNotEmpty, IsString, IsEmail, IsOptional, Length, IsDate 
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SubscriptionEntitie {
    
    @IsOptional()
    @IsString()
    @ApiProperty()
    protected id?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    @ApiProperty()
    protected user_id?: string
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    @ApiProperty()
    protected user_name?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    protected email?: string
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    protected subscription_status?: string
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    protected subscription_code?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsDate()
    @ApiProperty()
    protected trial_start?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsDate()
    @ApiProperty()
    protected trial_end?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsDate()
    @ApiProperty()
    protected down_date?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    protected down_reason?: string
    
}