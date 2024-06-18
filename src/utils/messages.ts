import { HttpCode } from "@nestjs/common"

export class MessagesService {
    
    protected password_error : object 
    protected user_name_error : object
    protected success_login: object
    protected success_register: object
    protected not_found: object
    protected success_create_user: object
    protected internal_server_error: object
    protected success_forgot_password: object
    protected success_logout: object
    protected success_profile_update: object
    protected subscription_not_found: object
    protected subscription_found: object
    protected subscription_not_created: object
    protected subscription_created: object
    protected subscription_updated: object
    protected subscription_downded: object
    protected user_not_found: object
    protected subscription_found_error: object
    protected success_create_email: object
    protected success_delete_email: object
    protected payment_flow_success: object

    constructor () {
        this.success_create_user = this.setMessage("User created successfull", 200)
        this.success_login = this.setMessage("Login successfull", 200)
        this.success_register = this.setMessage("Register successfull", 200)
        this.success_forgot_password = this.setMessage("Forgot password successfull", 200)
        this.success_logout = this.setMessage("Logout successfull", 200)
        this.success_profile_update = this.setMessage("Profile updated successfull", 200)
        this.password_error = this.setMessage("Password is required", 400, "Bad Request")
        this.user_name_error = this.setMessage("User name is required", 400, "Bad Request")
        this.not_found = this.setMessage("Resource not found", 404)
        this.internal_server_error = this.setMessage("Internal server error", 500)
        this.subscription_not_found = this.setMessage("Subscription not found", 404)
        this.subscription_found = this.setMessage("Subscription found", 200)
        this.subscription_not_created = this.setMessage("Subscription not created", 400)
        this.subscription_created = this.setMessage("Subscription created", 200)
        this.subscription_updated = this.setMessage("Subscription updated", 200)
        this.subscription_downded = this.setMessage("Subscription downded", 200)
        this.success_create_email = this.setMessage("Email created", 200)
        this.success_delete_email = this.setMessage("Email deleted", 200)
        this.payment_flow_success = this.setMessage("Payment flow successfull", 200)
    }

    private setMessage(message: string, statusCode: number, error?: string) {
        return {
            "message": [
                message
            ],
            ...(error !== undefined && { "error": error }),
            "statusCode": statusCode
        }
    }

    @HttpCode(500)
    internalServerError(error: any) {
        return {
            ...this.internal_server_error, 
            error: error, 
            error_message: [error.message]
        }
    }

    @HttpCode(200)
    successCreateUser() {
        return this.success_create_user
    }

    @HttpCode(404)
    userNotFound() {
        return this.user_not_found
    }
    
    @HttpCode(404)
    subscriptionFoundError() {
        return this.subscription_found_error
    }

    @HttpCode(200)
    successLogin() {
        return this.success_login
    }

    @HttpCode(200)
    successLogOutUser() {
        return this.success_logout
    }

    @HttpCode(200)
    successRegister() {
        return this.success_register
    }

    @HttpCode(200)
    successForgotPasswordMessageSend(info: any) {
        return {...this.success_forgot_password, info}
    }

    @HttpCode(200)
    successUserProfileUpdate() {
        return this.success_profile_update
    }

    @HttpCode(400)
    passwordError() {
        return this.password_error
    }

    @HttpCode(400)
    userNameError() {
        return this.user_name_error
    }

    @HttpCode(404)
    notFound() {
        return this.not_found
    }

    @HttpCode(400)
    subscriptionNotCreated(){
        return this.subscription_not_created
    }

    @HttpCode(200)
    subscriptionCreated(){ 
        return this.subscription_created
    }

    @HttpCode(404)
    subscriptionNotFound(){
        return this.subscription_not_found
    }

    @HttpCode(200)
    subscriptionFound(){
        return this.subscription_found
    }

    @HttpCode(200)
    subscriptionUpdated(){
        return this.subscription_updated
    }

    @HttpCode(200)
    emailCreated(){
        return this.success_create_email
    }

    @HttpCode(200)
    emailDeleted() {
        return this.success_delete_email
    }

    @HttpCode(200)
    subscriptionDownded() {
        return this.subscription_downded
    }

    @HttpCode(200)
    successPaymentFlow() {
        return this.payment_flow_success
    }

}