import { Controller, Get, Body, UseGuards, Query } from '@nestjs/common'
import { GetUserDto, GetUserDataDto, GetUserProfileDto
} from 'src/dto/users.dto'
import { UsersService } from './users.service'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { MessagesService } from 'src/utils/messages'
import { AuthGuard } from 'src/auth/guards/auth.guard'

@Controller('users')
@ApiTags('Users')
export class UsersController {

    constructor( 
        private readonly usersService: UsersService,
        private readonly messages: MessagesService
    ) {}

    @Get('get-user')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get User' })
    @ApiQuery({ type: GetUserDto, required: false })
    @ApiBearerAuth()
    getUser(@Query() req: GetUserDto){
        console.log(req)
        try {
            return this.usersService.getUser(req)
        } catch ( error ) {
            return this.messages.internalServerError()
        }
    }

    @Get('get-user-profile')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get User Profile' })
    @ApiBody({ type: GetUserProfileDto, required: false })
    @ApiBearerAuth()
    getUserProfile(@Query('req') req: GetUserProfileDto){
        try {
            return this.usersService.getUserProfile(req)
        } catch ( error ) {
            return this.messages.internalServerError()
        }
    }

    @Get('get-user-data')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get User Data' })
    @ApiBody({ type: GetUserDataDto, required: false })
    @ApiBearerAuth()
    getUserData(@Query('req') req: GetUserDataDto){
        try {
            return this.usersService.getUserData(req)
        } catch ( error ) {
            return this.messages.internalServerError()
        }
    }

}