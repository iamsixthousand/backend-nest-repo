import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Exceptions, Messages } from 'src/@core/strings';
import { User } from 'src/users/users.model';
import { ROLE_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector
                .getAllAndOverride<number[]>(
                    ROLE_KEY, [
                    context.getHandler(),
                    context.getClass(), // two in array for reflector
                ]);
            if (!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const [bearer, token] = authHeader.split(' ');

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({
                    message: Exceptions.userUnauthorized,
                });
            }

            const user: User = this.jwtService.verify(token);
            req.user = user;

            if (requiredRoles.includes(user.role.id)) {
                return true;
            }
            throw new Error();
        } catch (error) {
            throw new HttpException({ message: Messages.noAccess }, HttpStatus.FORBIDDEN);
        }
    }
}
