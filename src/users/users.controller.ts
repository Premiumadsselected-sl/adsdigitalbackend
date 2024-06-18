import { Controller, Get, Post, Put, Delete, Body, Patch} from '@nestjs/common'
import { CreateUserDto, GetUserDto, UpdateUserDto, DeleteUserDto, 
LoginUserDto, RegisterUserDto, ForgotPasswordDto,
ChangePasswordDto, LogoutDto,
GetUserDataDto,
GetUserDownloadsDto,
GetUserProfileDto,
SetUserDataDto,
UpdateUserDataDto,
UpdateUserProfileDto
} from 'src/dto/users.dto'
import { UsersService } from './users.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('users')
@ApiTags('Users')
export class UsersController {

    constructor( private readonly usersService: UsersService ) {}

    @Get('get-user')
    @ApiOperation({ summary: 'Get User' })
    getUser(@Body() req: GetUserDto){
        return this.usersService.getUser(req)
    }

    @Get('get-user-profile')
    @ApiOperation({ summary: 'Get User Profile' })
    getUserProfile(@Body() req: GetUserProfileDto){
        return this.usersService.getUserProfile(req)
    }

    @Get('get-user-downloads')
    @ApiOperation({ summary: 'Get User Downloads' })
    getUserDownloads(@Body() req: GetUserDownloadsDto){
        return this.usersService.getUserDownloads(req)
    }

    @Get('get-user-data')
    @ApiOperation({ summary: 'Get User Data' })
    getUserData(@Body() req: GetUserDataDto){
        return this.usersService.getUserData(req)
    }

    @Post('login-user')
    @ApiOperation({ summary: 'Login User' })
    loginUser(@Body() req: LoginUserDto){
        return this.usersService.loginUser(req)
    }

    @Post('forgot-password-user')
    @ApiOperation({ summary: 'Forgot Password' })
    forgotPassword(@Body() req: ForgotPasswordDto) {
        return this.usersService.forgotPassword(req)
    }

    @Post('logout-user')
    @ApiOperation({ summary: 'Logout User' })
    logout(@Body() req: LogoutDto) {
        return this.usersService.logout(req)
    }

    @Put('create-user')
    @ApiOperation({ summary: 'Create User' })
    createUser(@Body() req: CreateUserDto){
        return this.usersService.createUser(req)
    }

    @Put('register-user')
    @ApiOperation({ summary: 'Register User' })
    registerUser(@Body() req: RegisterUserDto){
        return this.usersService.registerUser(req)
    }

    @Put('set-user-data')
    @ApiOperation({ summary: 'Set User Data' })
    setUserData(@Body() req: SetUserDataDto){
        return this.usersService.setUserData(req)
    }

    @Patch('update-user')
    @ApiOperation({ summary: 'Update User' })
    updateUser(@Body() req: UpdateUserDto) {
        return this.usersService.updateUser(req)
    }

    @Patch('change-password-user')
    @ApiOperation({ summary: 'Change Password' })
    changePassword(@Body() req: ChangePasswordDto) {
        return this.usersService.changePassword(req)
    }

    @Patch('update-user-profile')
    @ApiOperation({ summary: 'Update User Profile' })
    updateUserProfile(@Body() req: UpdateUserProfileDto) {
        return this.usersService.updateUserProfile(req)
    }

    @Patch('update-user-data')
    @ApiOperation({ summary: 'Update User Data' })
    updateUserData(@Body() req: UpdateUserDataDto) {
        return this.usersService.updateUserData(req)
    }

    @Delete('delete-user')
    @ApiOperation({ summary: 'Delete User' })
    deleteUser(@Body() req: DeleteUserDto){
        return this.usersService.deleteUser(req)
    }

}