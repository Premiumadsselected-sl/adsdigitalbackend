import { IsNotEmpty, IsObject
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AuthEntitie {
        
    @IsNotEmpty()
    @IsObject()
    @ApiProperty()
    protected credentials: object

}