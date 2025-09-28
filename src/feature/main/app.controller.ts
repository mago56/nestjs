import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {exploreGlobalApiTagsMetadata} from "@nestjs/swagger/dist/explorers/api-use-tags.explorer";
import {AppControllerHelloWorld} from "./app.swagger";
import {Public} from "@common/config";


@ApiTags('Route de base')
@Controller('main')
export class AppController {
  constructor(private readonly appService: AppService) {}
    @Public()
    @ApiOperation(AppControllerHelloWorld)
    @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
