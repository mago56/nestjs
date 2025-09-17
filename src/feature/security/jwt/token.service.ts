import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {
    Credentials,
    RefreshPayload,
    Token,
    TokenExpiredException,
    TokenGenerationException,
    UserNotFoundException
} from "../data";
import { Repository } from "typeorm";
import {JwtService} from "@nestjs/jwt";
import {ConfigKey, configManager} from "@common/config";
import {Builder} from 'builder-pattern';
import {isNil} from "@nestjs/common/utils/shared.utils";
import {ulid} from "ulid";



@Injectable()
export class TokenService {
    private readonly logger = new Logger(TokenService.name);

    constructor(@InjectRepository(Token) private readonly repository: Repository<Token>,
                @InjectRepository(Credentials) private readonly credentialRepository: Repository<Credentials>,
                private jwtService: JwtService) {
    }


    async getTokens(credential: Credentials): Promise<Token | null> {
        try {
            await this.deleteFor(credential);
            const payload = {sub: credential.credential_id};
            const token = await this.jwtService.signAsync(payload, {
                secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
                expiresIn: configManager.getValue(ConfigKey.JWT_TOKEN_EXPIRE_IN)
            });
            const refreshToken = await this.jwtService.signAsync(payload, {
                secret: configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_SECRET),
                expiresIn: configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_EXPIRE_IN)
            });
            await this.repository.upsert(
                Builder<Token>().token_id(ulid()).token(token).refreshToken(refreshToken).credential(credential).build(), ['credential']
            );
            return await this.repository.findOneBy({token: token});
        } catch (e) {
            this.logger.error(e.message);
            throw new TokenGenerationException();

        }

    }

    async deleteFor(credential: Credentials): Promise<void> {
        await this.repository.delete({credential})
    }

    async refresh(payload: RefreshPayload): Promise<Token | null> {
        try {
            const id = this.jwtService.verify(payload.refresh, {secret:
                    configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_SECRET)}).sub;
            const credential: Credentials | null = await this.credentialRepository.findOneBy({credential_id: id});
            if(isNil(credential)){
                throw new UserNotFoundException();
            }
            return await this.getTokens(credential);
        } catch (e) {
            this.logger.error(e.message);
            throw new TokenExpiredException();
        }
    }

}


