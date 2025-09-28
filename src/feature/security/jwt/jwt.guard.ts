
import {JwtService} from '@nestjs/jwt';
import {from, Observable} from 'rxjs';
import {Credentials, NoTokenFoundedException, TokenExpiredException} from '../data';
import {Reflector} from '@nestjs/core';
import {IS_ADMIN, IS_PUBLIC_KEY} from '@common/config';
import {isNil} from 'lodash';
import {SecurityService} from '../security.service';
import {map} from 'rxjs/operators';
import {CanActivate, ExecutionContext, Injectable, Logger} from "@nestjs/common";

@Injectable()
export class JwtGuard implements CanActivate {
    private readonly logger = new Logger(JwtGuard.name);

    constructor(private readonly jwtService: JwtService, private readonly securityService: SecurityService, private reflector:
    Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        //Here we check if route have @Public decorator;
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN, [context.getHandler(), context.getClass()]);
        return isPublic ? true : this.validateToken(context.switchToHttp().getRequest(), isAdmin);
    }

    private async validateToken(request: any , isAdmin:boolean): Promise<boolean> {
        if (!isNil(request.headers['authorization'])) {
            try {
                const id = this.jwtService.verify(request.headers['authorization'].replace('Bearer ', '')).sub;

                request.user = await this.securityService.detail(id);
                return !isAdmin ? true : request.user.isAdmin ;
            } catch (e) {
                this.logger.log(e.message);
                throw new TokenExpiredException()
            }
        }
        throw new NoTokenFoundedException();
    }
}
