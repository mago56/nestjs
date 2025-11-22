import {Controller, Get} from '@nestjs/common';
import {Public} from "@common/config";
import {ApiOperation} from "@nestjs/swagger";
import {AppControllerHelloWorld} from "../../../main/app.swagger";
import {Profile} from "../../data/entity/profile.entity";

@Controller('profile')
export class ProfileController {
    @Public()
    @ApiOperation(AppControllerHelloWorld)
    @Get('list')
    getHello(): Profile[] {
        return [new Profile() , new Profile()];

    }
}
