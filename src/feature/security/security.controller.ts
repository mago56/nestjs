import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Credentials, RefreshPayload, SignInPayload, SignUpPayload} from "./data";
import {SecurityService} from "./security.service";

@ApiBearerAuth('access-token')
@ApiTags('Account')
@Controller('account')
export class SecurityController {
    constructor(private readonly service: SecurityService) {
    }


    @Post('sign-in')
    public SignIn(@Body() payload: SignInPayload) {
        return this.service.signIn(payload);
    }


    @Post('signup')
    public signUp(@Body() payload: SignUpPayload) {
        return this.service.signup(payload);
    }

    @Post('refresh')
    public refresh(@Body() payload: RefreshPayload) {
        return this.service.refresh(payload);
    }

    @Get('me')
    public me(user: Credentials) {
        return user;
    }

    @Delete('delete/:id')
    public delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
