import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Credentials, Token} from "./data/entity";
import {TokenService} from './jwt/token.service';
import {ConfigKey, configManager} from "@common/config";
import {JwtModule} from "@nestjs/jwt";
import { SecurityService } from './security.service';
import {SecurityController} from "./security.controller";


@Module({
    imports:[JwtModule.register({
        global: true,
        secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
        signOptions: {expiresIn: configManager.getValue(ConfigKey.JWT_TOKEN_EXPIRE_IN)},
    }), TypeOrmModule.forFeature([Credentials, Token])],
    providers: [TokenService, SecurityService],
    controllers:[SecurityController],
})
export class SecurityModule {}
