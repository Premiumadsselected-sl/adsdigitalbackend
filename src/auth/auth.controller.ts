import { Controller, Body, Post, Delete, Patch, Put } 
from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from 'src/dto/auth.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import * as dto from 'src/dto/users.dto'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor( 
        private readonly authService: AuthService,
    ) {}

    @Post()
    auth(@Body() credentials: AuthDto){
        return this.authService.auth(credentials)
    }

    @Post('login')
    @ApiOperation({ summary: 'Login User' })
    login(@Body() req: dto.LoginDto){
        return this.authService.login(req)
    }

    @Post('logout')
    @ApiOperation({ summary: 'Logout User' })
    logout(@Body() req: dto.LogoutDto) {
        return this.authService.logout(req)
    }

    @Post('register')
    @ApiOperation({ summary: 'Register User' })
    register(@Body() req: dto.RegisterDto){
        return this.authService.register(req)
    }

    @Post('forgot-password-user')
    @ApiOperation({ summary: 'Forgot Password' })
    forgotPassword(@Body() req: dto.ForgotPasswordDto) {
        return this.authService.forgotPassword(req)
    }

    @Put('set-user-data')
    @ApiOperation({ summary: 'Set User Data' })
    setUserData(@Body() req: dto.SetUserDataDto){
        return this.authService.setUserData(req)
    }

    @Patch('update-user')
    @ApiOperation({ summary: 'Update User' })
    updateUser(@Body() req: dto.UpdateUserDto) {
        return this.authService.updateUser(req)
    }

    @Patch('change-password-user')
    @ApiOperation({ summary: 'Change Password' })
    changePassword(@Body() req: dto.ChangePasswordDto) {
        return this.authService.changePassword(req)
    }

    @Patch('update-user-profile')
    @ApiOperation({ summary: 'Update User Profile' })
    updateUserProfile(@Body() req: dto.UpdateUserProfileDto) {
        return this.authService.updateUserProfile(req)
    }

    @Patch('update-user-data')
    @ApiOperation({ summary: 'Update User Data' })
    updateUserData(@Body() req: dto.UpdateUserDataDto) {
        return this.authService.updateUserData(req)
    }

    @Delete('delete-user')
    @ApiOperation({ summary: 'Delete User' })
    deleteUser(@Body() req: dto.DeleteUserDto){
        return this.authService.deleteUser(req)
    }

}