import {Injectable, Logger} from '@nestjs/common';
import {TokenService} from "./jwt/token.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {
    CredentialDeleteException,
    Credentials, RefreshPayload,
    SignInPayload, SignupException,
    SignUpPayload,
    Token,
    UserAlreadyExistException,
    UserNotFoundException
} from "./data";
import {isNil} from "@nestjs/common/utils/shared.utils";
import {comparePassword, encryptPassword} from "./util/password.decoder";
import {Builder} from "builder-pattern";
import {ulid} from "ulid";

@Injectable()
export class SecurityService {
    private readonly logger  = new Logger(SecurityService.name);

    constructor(@InjectRepository(Credentials) private readonly repository: Repository<Credentials>,
                private readonly tokenService: TokenService) {
    }

    async detail(id: string): Promise<Credentials> {
        const result = await this.repository.findOneBy({credential_id: id});
        if (!(isNil(result))) {
            return result;
        }
        throw new UserNotFoundException();
    }

    async getByUsername(username: string, throwIfNotFound: boolean): Promise<Credentials|undefined> {
        const result = await this.repository.findOneBy({username});
        if(throwIfNotFound){
            if (!(isNil(result))) {
                return result;
            }
            throw new UserNotFoundException();
        } else{
            if (!(isNil(result))) {

                throw new UserAlreadyExistException();
            }

        }

    }

    async signIn(payload: SignInPayload): Promise<Token | null> {
        const result  = await this.getByUsername(payload.username , true);
        if (await comparePassword(payload.password, result!.password)) {
            return this.tokenService.getTokens(result!);
        }
        throw new UserNotFoundException();

    }

    async signup(payload: SignUpPayload): Promise<Credentials | null> {
        await this.getByUsername(payload.username, false);
        try {
            const encryptedPassword = await encryptPassword(payload.password);
            const newCredential:Credentials = Builder<Credentials>()
                .credential_id(ulid())
                .username(payload.username)
                .password(encryptedPassword)
                .mail(payload.mail)
                .build();
            return await this.repository.save(newCredential);
        } catch (e) {
            throw new SignupException();
        }
    }

    async refresh(payload: RefreshPayload): Promise<Token | null> {
        return this.tokenService.refresh(payload);
    }

    async delete(id:string): Promise<void> {
        try {
            const detail = await this.detail(id);
            await this.tokenService.deleteFor(detail);
            await this.repository.remove(detail);
        } catch (e) {
            throw new CredentialDeleteException();
        }
    }
}



