import { UserEntitie } from '../entities/users'

export class LoginDto extends UserEntitie {
    email?: UserEntitie['email']
    password: UserEntitie['password']
    remember_me?: UserEntitie['remember_me']

}

export class LogoutDto extends UserEntitie {
    email?: UserEntitie['email']
    
}

export class RegisterDto extends UserEntitie {
    user_name: UserEntitie['user_name']
    email?: UserEntitie['email']
    password: UserEntitie['password']
    remember_me?: UserEntitie['remember_me']

}

export class GetUserDto extends UserEntitie {
    id?: UserEntitie['id']
    email?: UserEntitie['email']

}

export class GetUserProfileDto extends UserEntitie {
    id?: UserEntitie['id']
    email?: UserEntitie['email']
}

export class UpdateUserDto extends UserEntitie {
    id?: UserEntitie['id']
    email?: UserEntitie['email']
    user_name: UserEntitie['user_name']
    
}

export class UpdateUserProfileDto extends UserEntitie {
    id?: UserEntitie['id']
    email?: UserEntitie['email']
    user_name: UserEntitie['user_name']
}

export class DeleteUserDto extends UserEntitie {
    id?: UserEntitie['id']
    email?: UserEntitie['email']

}

export class ForgotPasswordDto extends UserEntitie {
    locale: UserEntitie['locale']
    email?: UserEntitie['email']
    user_password_token: UserEntitie['user_password_token']
    user_service_emails_styles?: UserEntitie['user_service_emails_styles']
    user_service_domain_url: UserEntitie['user_service_domain_url']
    user_service_support_email: UserEntitie['user_service_support_email']
    user_service_name: UserEntitie['user_service_name']

}

export class ChangePasswordDto extends UserEntitie {
    email?: UserEntitie['email']
    password: UserEntitie['password']

}

export class SetUserDataDto extends UserEntitie {
    id?: UserEntitie['id']
    email?: UserEntitie['email']
    user_data: UserEntitie['user_data']
    
}

export class GetUserDataDto extends UserEntitie {
    id?: UserEntitie['id']
    email?: UserEntitie['email']
    
}

export class UpdateUserDataDto extends UserEntitie {
    id?: UserEntitie['id']
    email?: UserEntitie['email']
    user_data: UserEntitie['user_data']

}