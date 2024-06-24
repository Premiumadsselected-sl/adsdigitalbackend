import { Controller, Body, Post, Delete, Patch, Put, UseGuards } 
from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import * as dto from 'src/dto/users.dto'
import { MessagesService } from 'src/utils/messages'
import { AuthGuard } from './guards/auth.guard'
import { AdminGuard } from './guards/admin.guard'

@Controller('auth')
@ApiTags('🔐 Auth')
export class AuthController {

    constructor( 
        private readonly authService: AuthService,
        private readonly messagesService: MessagesService
    ) {}

    @Post('login')
    @ApiOperation({ summary: 'Login User' })
    @ApiBody({ type: dto.LoginDto })
    @ApiResponse({ status: 200, description: 'User logged in successfully. Response contains user data.'})
    @ApiResponse({ status: 400, description: 'Bad request. Please check your information.'}) 
    @ApiResponse({ status: 401, description: 'Invalid credentials provided.'}) 
    @ApiResponse({ status: 403, description: 'Forbidden. Access is denied.'})
    @ApiResponse({ status: 404, description: 'Notfound. User not found.'})
    login(@Body() req: dto.LoginDto) {
        try {
            return this.authService.login(req)
        } catch( error ) {
            return this.messagesService.internalServerError()
        }
    }

    @Post('register')
    @ApiOperation({ summary: 'Register User' })
    @ApiBody({ type: dto.RegisterDto })
    @ApiResponse({ status: 400, description: 'Bad request. Please check your information.'})
    @ApiResponse({ status: 409, description: 'Conflict. User already exists.'})
    @ApiResponse({ status: 201, description: 'User registered successfully.'})
    register(@Body() req: dto.RegisterDto) {
        try {
            return this.authService.register(req)
        } catch( error ) {
            return this.messagesService.internalServerError()
        }
    }

    @Post('logout')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Logout User' })
    @ApiBody({ type: dto.LogoutDto })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'User logged out successfully.'})
    @ApiResponse({ status: 400, description: 'Bad request. Please check your information.'})
    logout(@Body() req: dto.LogoutDto) {
        try {
            return this.authService.logout(req)
        } catch( error ) {
            return this.messagesService.internalServerError()
        }
    }

    @Post('forgot-password-user')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Forgot Password' })
    @ApiBody({ type: dto.ForgotPasswordDto })
    @ApiBearerAuth()
    @ApiResponse({ status: 400, description: 'Bad request. Please check your information.'}) 
    @ApiResponse({ status: 404, description: 'Not found. User email not found in the system.'}) 
    @ApiResponse({ status: 200, description: 'An email with password reset instructions has been sent.'})
    forgotPassword(@Body() req: dto.ForgotPasswordDto) {
        try {
            return this.authService.forgotPassword(req)
        } catch( error ) {
            return this.messagesService.internalServerError()
        }
    }

    @Put('set-user-data')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Set User Data' })
    @ApiBody({ type: dto.SetUserDataDto })
    @ApiBearerAuth()
    @ApiResponse({ status: 400, description: 'Bad request. Please check your information.'})
    @ApiResponse({ status: 200, description: 'User data set successfully. Response contains updated user data.'})
    setUserData(@Body() req: dto.SetUserDataDto) {
        try {
            return this.authService.setUserData(req)
        } catch( error ) {
            return this.messagesService.internalServerError()
        }
    }

    @Patch('update-user')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Update User' })
    @ApiBody({ type: dto.UpdateUserDto })
    @ApiBearerAuth()
    @ApiResponse({ status: 400, description: 'Bad request. Please check your information.'})
    @ApiResponse({ status: 404, description: 'Not found. User not found in the system.'})
    @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to update profile.'}) 
    @ApiResponse({ status: 200, description: 'User updated successfully. Response contains updated user data.'})
    updateUser(@Body() req: dto.UpdateUserDto) {
        try {
            return this.authService.updateUser(req)
        } catch( error ) {
            return this.messagesService.internalServerError()
        }
    }

    @Patch('change-password-user')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Change Password' })
    @ApiBody({ type: dto.ChangePasswordDto })
    @ApiBearerAuth()
    @ApiResponse({ status: 400, description: 'Bad request. Please check your information.'})
    @ApiResponse({ status: 401, description: 'Unauthorized. Incorrect current password.'}) 
    @ApiResponse({ status: 200, description: 'Password changed successfully.'})
    changePassword(@Body() req: dto.ChangePasswordDto) {
        try { return this.authService.changePassword(req) } 
        catch( error ) {
            return this.messagesService.internalServerError()
        }
    }

    @Patch('update-user-profile')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Update User Profile' })
    @ApiBody({ type: dto.UpdateUserProfileDto })
    @ApiBearerAuth()
    @ApiResponse({ status: 400, description: 'Bad request. Please check your information.'})
    @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to update profile.'}) 
    @ApiResponse({ status: 200, description: 'User profile updated successfully. Response contains updated user data.'})
    updateUserProfile(@Body() req: dto.UpdateUserProfileDto) {
        try { return this.authService.updateUserProfile(req) } 
        catch( error ) {
            return this.messagesService.internalServerError()
        }
    }

    @Patch('update-user-data')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Update User Data' })
    @ApiBody({ type: dto.UpdateUserDataDto })
    @ApiBearerAuth()
    @ApiResponse({ status: 400, description: 'Bad request. Please check your information.'})
    @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to update data.'})
    @ApiResponse({ status: 200, description: 'User data updated successfully. Response contains updated user data.'})
    updateUserData(@Body() req: dto.UpdateUserDataDto) {
        try { return this.authService.updateUserData(req) } 
        catch( error ) {
            return this.messagesService.internalServerError()
        }
    }

    @Delete('delete-user')
    @UseGuards(AdminGuard)
    @ApiOperation({ summary: 'Delete User' })
    @ApiBody({ type: dto.DeleteUserDto })
    @ApiBearerAuth()
    @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to delete users.'})
    @ApiResponse({ status: 403, description: 'Forbidden. User cannot delete themself.'})
    @ApiResponse({ status: 200, description: 'User deleted successfully.'})
    deleteUser(@Body() req: dto.DeleteUserDto){
        try { return this.authService.deleteUser(req) } 
        catch( error ) { 
            return this.messagesService.internalServerError()
        }
    }

}