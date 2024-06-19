import { HttpCode } from "@nestjs/common"
import { 
BadRequestException, 
InternalServerErrorException,
NotFoundException
} from "@nestjs/common"

export class MessagesService {
    
    protected bad_request_error: object
    protected not_found: object
    protected internal_server_error: object
    protected invalid_password_error : object 
    protected invalid_user_name_error : object
    protected invalid_user_email_error : object
    protected user_not_found: object
    protected user_found_error: object
    protected forgot_password_error: object
    protected success_login: object
    protected success_register: object
    protected success_create_user: object
    protected success_forgot_password: object
    protected success_logout: object
    protected success_profile_update: object
    protected subscription_not_found: object
    protected success_delete_email: object
    protected payment_flow_success: object
    protected payment_flow_error: object
    protected subscription_found: object
    protected subscription_found_active: object
    protected subscription_found_error: object
    protected subscription_not_created: object
    protected subscription_not_active: object
    protected subscription_created: object
    protected subscription_updated: object
    protected subscription_downed: object
    protected success_create_email: object

    constructor () {
        this.internal_server_error = this.sendMessage("Internal server error", 500)
        this.bad_request_error = this.sendMessage("Bad request", 400)
        this.not_found = this.sendMessage("Resource not found", 404)
        this.user_found_error = this.sendMessage("User found", 409)
        this.user_not_found = this.sendMessage("User not found", 404)
        this.forgot_password_error = this.sendMessage("Forgot password error", 400)
        this.invalid_password_error = this.sendMessage("Password is required", 400)
        this.invalid_user_name_error = this.sendMessage("User name is required", 400)
        this.invalid_user_email_error = this.sendMessage("User email is required", 400)
        this.success_login = this.sendMessage("Login successfull", 200)
        this.success_create_user = this.sendMessage("User created successfull", 200)
        this.success_register = this.sendMessage("Register successfull", 200)
        this.success_forgot_password = this.sendMessage("Forgot password successfull", 200)
        this.success_logout = this.sendMessage("Logout successfull", 200)
        this.success_profile_update = this.sendMessage("Profile updated successfull", 200)
        this.success_create_email = this.sendMessage("Email created", 200)
        this.success_delete_email = this.sendMessage("Email deleted", 200)
        this.payment_flow_success = this.sendMessage("Payment flow successfull", 200)
        this.payment_flow_error = this.sendMessage("Payment flow error", 200)
        this.subscription_not_found = this.sendMessage("Subscription not found", 404)
        this.subscription_found_error = this.sendMessage("Subscription found", 409)
        this.subscription_found = this.sendMessage("Subscription found", 200)
        this.subscription_found_active = this.sendMessage("Subscription found active", 200)
        this.subscription_not_created = this.sendMessage("Subscription not created", 400)
        this.subscription_created = this.sendMessage("Subscription created", 200)
        this.subscription_updated = this.sendMessage("Subscription updated", 200)
        this.subscription_downed = this.sendMessage("Subscription downded", 200)
        this.subscription_not_active = this.sendMessage("Subscription not active", 409)
    }

    private sendMessage(message: string, statusCode: number, error?: string):object {
        
        switch (statusCode) {
            case 500: return new InternalServerErrorException(message)
            case 400: return new BadRequestException(message)
            case 404: return new NotFoundException(message)
            case 409: return new BadRequestException(message)
            default: return {
                message: [ message ],
                ...( error !== undefined && { "error": error } ),
                statusCode: statusCode
            }

        }

    }

    internalServerError(error: any) {
        return {
            ...this.internal_server_error, 
            error: error, 
            error_message: [error.message]
        }
    }

    badRequest(error: any) {
        return {
            ...this.bad_request_error,
            error: error,
            error_message: [error.message]
        }
    }

    notFound() { return this.not_found }
    userFoundError() { return this.user_found_error }
    subscriptionFoundError() {
        return this.subscription_found_error
    }

    @HttpCode(400)
    invalidPasswordError() {
        return this.invalid_password_error
    }

    @HttpCode(400)
    invalidUserNameError() {
        return this.invalid_user_name_error
    }

    @HttpCode(400)
    invalidUserEmailError() {
        return this.invalid_user_email_error
    }

    @HttpCode(200)
    successCreateUser() {
        return this.success_create_user
    }

    @HttpCode(200)
    successLogin() {
        return this.success_login
    }

    @HttpCode(200)
    successLogOut() {
        return this.success_logout
    }

    @HttpCode(404)
    notFoundUser() {
        return this.user_not_found
    }

    @HttpCode(200)
    successUserProfileUpdate() {
        return this.success_profile_update
    }

    @HttpCode(200)
    successRegister() {
        return this.success_register
    }

    @HttpCode(404)
    subscriptionNotFound(){
        return this.subscription_not_found
    }

    @HttpCode(200)
    subscriptionFound(status: string){
        return {
            ...this.subscription_found,
            status: status
        }
    }

    @HttpCode(409)
    subscriptionNotActive(){
        return this.subscription_not_active
    }

    @HttpCode(200)
    subscriptionFoundActive(){
        return this.subscription_found_active
    }

    @HttpCode(400)
    subscriptionNotCreated(){
        return this.subscription_not_created
    }

    @HttpCode(200)
    subscriptionCreated(){ 
        return this.subscription_created
    }

    @HttpCode(200)
    subscriptionUpdated(){
        return this.subscription_updated
    }

    @HttpCode(200)
    subscriptionDowned() {
        return this.subscription_downed
    }

    @HttpCode(200)
    PaymentFlowError() {
        return this.payment_flow_error
    }

    @HttpCode(200)
    successPaymentFlow() {
        return this.payment_flow_success
    }

    @HttpCode(200)
    forgotPasswordMessageError(info: any) {
        return {...this.forgot_password_error, info}
    }

    @HttpCode(200)
    successForgotPasswordMessageSend(info: any) {
        return {...this.success_forgot_password, info}
    }

    @HttpCode(200)
    emailCreated(){
        return this.success_create_email
    }

    @HttpCode(200)
    emailDeleted() {
        return this.success_delete_email
    }

}