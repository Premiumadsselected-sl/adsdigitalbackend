import { Controller, Get, Body } from '@nestjs/common'
import { GetUserDto, GetUserDataDto, GetUserProfileDto
} from 'src/dto/users.dto'
import { UsersService } from './users.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { MessagesService } from 'src/utils/messages'

@Controller('users')
@ApiTags('Users')
export class UsersController {

    constructor( 
        private readonly usersService: UsersService,
        private readonly messages: MessagesService
    ) {}

    @Get('get-user')
    @ApiOperation({ summary: 'Get User' })
    getUser(@Body() req: GetUserDto){
        try {
            return this.usersService.getUser(req)
        } catch ( error ) {
            return this.messages.internalServerError(error)
        }
    }

    @Get('get-user-profile')
    @ApiOperation({ summary: 'Get User Profile' })
    getUserProfile(@Body() req: GetUserProfileDto){
        try {
            return this.usersService.getUserProfile(req)
        } catch ( error ) {
            return this.messages.internalServerError(error)
        }
    }

    @Get('get-user-data')
    @ApiOperation({ summary: 'Get User Data' })
    getUserData(@Body() req: GetUserDataDto){
        try {
            return this.usersService.getUserData(req)
        } catch ( error ) {
            return this.messages.internalServerError(error)
        }
    }

}