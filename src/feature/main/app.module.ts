import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AccountModule} from "../account/account.module";
import {ProfileModule} from "../profile/profile.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {configManager} from "@common/config/config.manager";
import {SecurityModule} from "@security";

@Module({
  imports: [SecurityModule,AccountModule, ProfileModule, TypeOrmModule.forRoot(configManager.getTypeOrmConfig())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
