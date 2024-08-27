import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { KEY_DECORATOR, KEY_GUARD } from '../constant';
import { Reflector } from '@nestjs/core';
import { Payload } from '../dto';

@Injectable()
export class JwtAuthGuard extends AuthGuard(KEY_GUARD.JWT_GLOBAL) {
   constructor(private readonly reflector: Reflector) {
      super();
   }

   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(KEY_DECORATOR.PUBLIC, [
         context.getHandler(),
         context.getClass(),
      ]);

      if (isPublic) return true;

      return super.canActivate(context);
   }

   handleRequest<Payload>(_: any, user: Payload): Payload {
      this.checkUserLogin(user);
      return user;
   }

   private checkUserLogin(payload: Payload | Partial<Payload>): void {
      if (!payload) {
         throw new BadRequestException('hd');
      }

      const now: number = Date.now();
      const expiredToken: number = payload?._expired;

      if (now > expiredToken) {
         throw new BadRequestException('');
      }
   }
}
