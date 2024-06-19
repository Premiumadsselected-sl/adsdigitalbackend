import { IsNotEmpty, IsString, IsEmail, IsOptional, Length, IsDate 
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'

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
    
    @Transform( ({value}) => value.trim() )
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    @ApiProperty()
    protected user_name?: string

    @Transform( ({value}) => value.trim() )
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