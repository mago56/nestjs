import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Credentials, RefreshPayload, SignInPayload, SignUpPayload} from "./data";
import {SecurityService} from "./security.service";
import {Admin, Public, User} from "@common/config";
import {ApiResponse} from "@common/api/data/model/api-response.model";
import {ApiCodeResponse} from "@common/api";

@ApiBearerAuth('access-token')
@ApiTags('Account')
@Controller('account')
export class SecurityController {
    constructor(private readonly service: SecurityService) {
    }

    @Public()
    @Post('sign-in')
    public SignIn(@Body() payload: SignInPayload) {
        return this.service.signIn(payload);
    }

    @Public()
    @Post('signup')
    public signUp(@Body() payload: SignUpPayload) {
        return this.service.signup(payload);
    }

    @Public()
    @Post('refresh')
    public refresh(@Body() payload: RefreshPayload) {
        return this.service.refresh(payload);
    }

    @Get('me')
    public me(@User() user: Credentials) {
        return user;
    }

    @Admin()
    @Get( ' me-admin')
    public meAdmin(@User() user: Credentials) {
        return user;
    }

    @Delete('delete/:id')
    public delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
