// import { SubscriptionEntitie } from '../entities/subscriptions'
import { IsNotEmpty, IsString, IsEmail, IsOptional, Length 
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'

export class CreateSubscriptionDto {
  @IsOptional()
  @IsString()
  @Length(3, 100)
  @ApiProperty({ required: false, description: "Identificador único para el usuario (opcional)." })
  user_id?: string;

  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsString()
  @Length(3, 100)
  @ApiProperty({ required: false, description: "Nombre del usuario (opcional)." })
  user_name?: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ required: true, description: "Correo electrónico del usuario." })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: "Código de suscripción (opcional)." })
  subscription_code?: string;
}

export class GetSubscriptionDto {
  @IsOptional()
  @IsString()
  @Length(3, 100)
  @ApiProperty({ required: false, description: "Identificador único para el usuario (opcional)." })
  user_id?: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ required: true, description: "Correo electrónico del usuario." })
  email: string;
}

export class validateSubscription {
  @IsOptional()
  @IsString()
  @Length(3, 100)
  @ApiProperty({ required: false, description: "Identificador único para el usuario (opcional)." })
  user_id?: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ required: true, description: "Correo electrónico del usuario." })
  email: string;
}

export class UpdateSubscription {
  @IsOptional()
  @IsString()
  @Length(3, 100)
  @ApiProperty({ required: false, description: "Identificador único para el usuario (opcional)." })
  user_id?: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ required: true, description: "Correo electrónico del usuario." })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: "Estado de la suscripción (opcional)." })
  subscription_status?: string;
}

export class DownSubscription {
  @IsOptional()
  @IsString()
  @Length(3, 100)
  @ApiProperty({ required: false, description: "Identificador único para el usuario (opcional)." })
  user_id?: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ required: true, description: "Correo electrónico del usuario." })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, description: "Motivo para la baja de la suscripción (opcional)." })
  down_reason?: string;
  
}
