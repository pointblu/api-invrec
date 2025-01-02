/* eslint-disable prettier/prettier */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
/* import { IAuthService } from 'domain/services/auth/IAuthService.interface'; */

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(/* private readonly authService: IAuthService */) {
    super();
  }

  /*   async validate(username: string, password: string): Promise<any> {
      const user = await this.authService.verifyUser(username, password);
  
      if (!user) {
        throw new UnauthorizedException();
      }
  
      return user;
    } */
}
