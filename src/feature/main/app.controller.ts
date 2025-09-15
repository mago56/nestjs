import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {exploreGlobalApiTagsMetadata} from "@nestjs/swagger/dist/explorers/api-use-tags.explorer";


@ApiTags('Route de base')
@Controller('main')
export class AppController {
  constructor(private readonly appService: AppService) {}
    @ApiOperation({ summary: 'Opération HelloWorld()', description:'Cette opération est celle de base' })
    @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
