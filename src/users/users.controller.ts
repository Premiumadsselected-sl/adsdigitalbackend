import { Controller, Get, UseGuards, Query, Body, Post } from '@nestjs/common'
import { GetUserDto, GetUserDataDto, GetUserProfileDto
} from 'src/dto/users.dto'
import { UsersService } from './users.service'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { MessagesService } from 'src/utils/messages'
import { AuthGuard } from 'src/auth/guards/auth.guard'

@Controller('users')
@ApiTags('👨‍💻 Users')
export class UsersController {

    constructor( 
        private readonly usersService: UsersService,
        private readonly messages: MessagesService
    ) {}

    @Post('get-user')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get User' })
    @ApiBody({ type: GetUserDto })
    @ApiBearerAuth()
    @ApiResponse({ status: 400, description: 'Bad request. Please check your information.'})
    @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to access user data.'}) 
    @ApiResponse({ status: 404, description: 'Not found. User not found.'})
    @ApiResponse({ status: 200, description: 'User retrieved successfully. Response contains user data.'})
    getUser(@Body() req: GetUserDto){
        try { return this.usersService.getUser(req) } 
        catch ( error ) {
            return this.messages.internalServerError()
        }
    }

    @Post('get-user-profile')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get User Profile' })
    @ApiBody({ type: GetUserProfileDto })
    @ApiBearerAuth()
    @ApiResponse({ status: 400, description: 'Bad request. Please check your information.'})
    @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to access user profile.'}) 
    @ApiResponse({ status: 404, description: 'Not found. User profile not found.'})
    @ApiResponse({ status: 200, description: 'User profile retrieved successfully. Response contains user profile data.'})
    getUserProfile(@Body() req: GetUserProfileDto){
        try { return this.usersService.getUserProfile(req) } 
        catch ( error ) {
            return this.messages.internalServerError()
        }
    }

    @Post('get-user-data')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get User Data' })
    @ApiBody({ type: GetUserDataDto })
    @ApiBearerAuth()
    @ApiResponse({ status: 400, description: 'Bad request. Please check your information.'})
    @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to access user data.'}) 
    @ApiResponse({ status: 404, description: 'Not found. User data not found.'})
    @ApiResponse({ status: 200, description: 'User data retrieved successfully. Response contains user data.'})
    getUserData(@Body() req: GetUserDataDto){
        try { return this.usersService.getUserData(req) } 
        catch ( error ) {
            return this.messages.internalServerError()
        }
    }

}