import { Controller, Body,Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from 'src/dto/auth.dto'
import { ApiTags } from '@nestjs/swagger'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor( private readonly authService: AuthService ) {}

    @Post()
    auth(@Body() credentials: AuthDto){
        return this.authService.auth(credentials)
    }

}