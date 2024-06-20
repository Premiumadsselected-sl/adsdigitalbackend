import { Controller, Body, Post, Delete, Patch, Put, UseGuards } 
from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import * as dto from 'src/dto/users.dto'
import { MessagesService } from 'src/utils/messages'
import { AuthGuard } from './guards/auth.guard'
import { AdminGuard } from './guards/admin.guard'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor( 
        private readonly authService: AuthService,
        private readonly messagesService: MessagesService
    ) {}

    @Post('login')
    @ApiOperation({ summary: 'Login User' })
    @ApiBody({ type: dto.LoginDto })
    login(@Body() req: dto.LoginDto){
        try {
            return this.authService.login(req)
        } catch( error ) {
            return this.messagesService.internalServerError()
        }
    }

    @Post('register')
    @ApiOperation({ summary: 'Register User' })
    @ApiBody({ type: dto.RegisterDto })
    register(@Body() req: dto.RegisterDto){
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
    setUserData(@Body() req: dto.SetUserDataDto){
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
    changePassword(@Body() req: dto.ChangePasswordDto) {
        try {
            return this.authService.changePassword(req)
        } catch( error ) {
            return this.messagesService.internalServerError()
        }
    }

    @Patch('update-user-profile')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Update User Profile' })
    @ApiBody({ type: dto.UpdateUserProfileDto })
    @ApiBearerAuth()
    updateUserProfile(@Body() req: dto.UpdateUserProfileDto) {
        try {
            return this.authService.updateUserProfile(req)
        } catch( error ) {
            return this.messagesService.internalServerError()
        }
    }

    @Patch('update-user-data')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Update User Data' })
    @ApiBody({ type: dto.UpdateUserDataDto })
    @ApiBearerAuth()
    updateUserData(@Body() req: dto.UpdateUserDataDto) {
        try {
            return this.authService.updateUserData(req)
        } catch( error ) {
            return this.messagesService.internalServerError()
        }
    }

    @Delete('delete-user')
    @UseGuards(AdminGuard)
    @ApiOperation({ summary: 'Delete User' })
    @ApiBody({ type: dto.DeleteUserDto })
    @ApiBearerAuth()
    deleteUser(@Body() req: dto.DeleteUserDto){
        try {
            return this.authService.deleteUser(req)
        } catch( error ) {
            return this.messagesService.internalServerError()
        }
    }

}