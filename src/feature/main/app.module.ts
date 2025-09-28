import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AccountModule} from "../account/account.module";
import {ProfileModule} from "../profile/profile.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {configManager} from "@common/config/config.manager";
import {SecurityModule} from "@security";
import {JwtGuard} from "../security/jwt/jwt.guard";
import {APP_GUARD} from "@nestjs/core";

@Module({
  imports: [SecurityModule,AccountModule, ProfileModule, TypeOrmModule.forRoot(configManager.getTypeOrmConfig())],
  controllers: [AppController],
  providers: [AppService ,{ provide: APP_GUARD, useClass: JwtGuard }],
})
export class AppModule {}
