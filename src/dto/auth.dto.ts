import { AuthProperties } from "src/entities/auth"

export class AuthDto extends AuthProperties {
    credentials: AuthProperties['credentials']
}


  