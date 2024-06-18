import { IsNotEmpty, IsObject
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthProperties {
        
    @IsNotEmpty()
    @IsObject()
    @ApiProperty()
    protected credentials: object

}