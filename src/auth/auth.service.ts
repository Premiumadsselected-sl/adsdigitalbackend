import { Injectable } from '@nestjs/common'
import { AuthDto } from 'src/dto/auth.dto'

@Injectable()
export class AuthService {

    auth( credentials: AuthDto ) {
        return 'This is auth login page credentials : ' + credentials
    }

}
