import { Module } from '@nestjs/common';
import { AccountController } from './controller/account/account.controller';
import {ProfileModule} from "../profile/profile.module";

@Module({
    imports:[],
  controllers: [AccountController]
})
export class AccountModule {}
