import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor (
        private readonly jwtService: JwtService,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.split(' ')[1] || '';

        if(!token) {
            throw new UnauthorizedException('Token no autoriozado');
        }

        try {
            const secret = process.env.JWT_SECRET;
            const payload = await this.jwtService.verifyAsync(token, { secret});
            request.user = payload;
            return true
        } catch (error) {
            throw new UnauthorizedException('Token Invalido')   
        }
    }
}