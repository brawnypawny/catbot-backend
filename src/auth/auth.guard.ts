import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {} //Reflector is for isPublic decorator console.log error debugging

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
    context.getHandler(),
    context.getClass(),
  ]);

    if (isPublic) {
      console.log('Public route, skipping authentication');
      return true;
    }


    let request;

    try {
      if ((context.getType() as string) === 'graphql') {
        const gqlCtx = GqlExecutionContext.create(context);
        request = gqlCtx.getContext().req;
      } else {
        request = context.switchToHttp().getRequest();
      }
    } catch {
      throw new UnauthorizedException('Unable to get request object');
    }

    if (!request || !request.headers) {
      throw new UnauthorizedException('No headers found');
    }

    const authHeader = request.headers.authorization;
    if (!authHeader) throw new UnauthorizedException('No authorization header');

    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('Token missing');

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.KIND_OF_CONFIDENTIAL });
      request.user = payload;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
