import { ConflictException, HttpCode } from "@nestjs/common"
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
    protected logout_error: object
    protected user_not_updated_error: object
    protected change_password_error: object
    protected user_delete_error: object
    protected log_email_error: object
    protected set_user_data_error: object
    protected update_user_data_error: object
    protected update_user_profile_error: object
    protected not_found_user_data_error: object
    protected update_subscription_error: object
    protected down_subcription_error: object
    protected success_update_user_data: object
    protected succes_user_deleted: object

    constructor () {
        this.internal_server_error = this.sendMessage("Internal server error", 500)
        this.bad_request_error = this.sendMessage("Bad request", 400)
        this.not_found = this.sendMessage("Resource not found", 404)
        this.user_found_error = this.sendMessage("User exsists", 409)
        this.user_not_found = this.sendMessage("User not found", 404)
        this.forgot_password_error = this.sendMessage("Forgot password error", 400)
        this.invalid_password_error = this.sendMessage("Invalid credentials", 400)
        this.invalid_user_name_error = this.sendMessage("Invalid credentials", 400)
        this.invalid_user_email_error = this.sendMessage("Invalid credentials", 400)
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
        this.logout_error = this.sendMessage("Logout error", 400)
        this.user_not_updated_error = this.sendMessage("User not updated", 400)
        this.change_password_error = this.sendMessage("Change password error", 400)
        this.user_not_updated_error = this.sendMessage("User not updated", 400)
        this.user_delete_error = this.sendMessage("User delete error", 400)
        this.log_email_error = this.sendMessage("Log email error", 400)
        this.set_user_data_error = this.sendMessage("Set user data error", 400)
        this.update_user_data_error = this.sendMessage("Update user data error", 400)
        this.update_user_profile_error = this.sendMessage("Update user profile error", 400)
        this.not_found_user_data_error = this.sendMessage("User data not found", 404)
        this.update_subscription_error = this.sendMessage("Update subscription error", 409)
        this.down_subcription_error = this.sendMessage("Down subscription error", 400)
        this.success_update_user_data = this.sendMessage("User data updated successfull", 200)
        this.succes_user_deleted = this.sendMessage("User deleted successfull", 200)
    }

    private sendMessage(message: string, statusCode: number, error?: string):object {
        
        switch (statusCode) {
            case 500: return new InternalServerErrorException(message)
            case 400: return new BadRequestException(message)
            case 404: return new NotFoundException(message)
            case 409: return new ConflictException(message)
            default: return {
                message: [ message ],
                ...( error !== undefined && { "error": error } ),
                statusCode: statusCode
            }
        }

    }

    @HttpCode(500)
    internalServerError() {
        return this.internal_server_error
    }

    @HttpCode(400)
    badRequest() {
        return this.bad_request_error
    }

    @HttpCode(404)
    notFound() { 
        return this.not_found 
    }

    @HttpCode(409)
    userFoundError() { 
        return this.user_found_error 
    }

    @HttpCode(409)
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



    // Need order
    @HttpCode(400)
    logOutError(){
        return this.logout_error
    }

    @HttpCode(400)
    changePasswordError(){
        return this.change_password_error
    }

    @HttpCode(400)
    userNotUpdated(){
        return this.user_not_updated_error
    }

    @HttpCode(400)
    userDeleteError(){
        return this.user_delete_error
    }

    @HttpCode(400)
    logEmailError(){
        return this.log_email_error
    }

    @HttpCode(400)
    setUserDataError(){
        return this.set_user_data_error
    }

    @HttpCode(400)
    updateUserDataError(){
        return this.update_user_data_error
    }

    @HttpCode(400)
    updateUserProfileError(){
        return this.update_user_profile_error
    }

    @HttpCode(404)
    notFoundUserData() {
        return this.not_found_user_data_error
    }

    @HttpCode(409)
    updateSubscriptionError(){
        return this.update_subscription_error
    }

    @HttpCode(400)
    downSubscriptionError(){
        return this.down_subcription_error
    }

    @HttpCode(409)
    userAlreadyRegistered() {
        return this.user_found_error
    }

    @HttpCode(200)
    successUpdateUserData() {
        return this.success_update_user_data
    }

    @HttpCode(200)
    successUserDeleted() {
        return this.succes_user_deleted
    }

    










}