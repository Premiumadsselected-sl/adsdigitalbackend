import { IsNotEmpty, IsString, IsEmail, IsOptional, Length, IsDate 
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'

export class SubscriptionEntitie {
    
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    protected id?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    @ApiProperty({ required: false })
    protected user_id?: string
    
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
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: false })
    protected subscription_status?: string
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: false })
    protected subscription_code?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsDate()
    @ApiProperty({ required: false })
    protected trial_start?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsDate()
    @ApiProperty({ required: false })
    protected trial_end?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsDate()
    @ApiProperty({ required: false })
    protected down_date?: string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: false })
    protected down_reason?: string
    
}