import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Exceptions } from "src/@core/strings";

export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const header = req.headers.authorization;
            const [bearer, token] = header.split(" "); 

            if (bearer !== 'Bearer' && !token) {
                throw new UnauthorizedException({message: Exceptions.userUnauthorized}); 
            }

            const user = this.jwtService.verify(token);
            req.user = user;
            return true;

        } catch (error) {
            throw new UnauthorizedException({message: Exceptions.userUnauthorized});
        }
    }
    
}