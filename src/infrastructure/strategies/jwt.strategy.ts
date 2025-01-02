/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { constants } from 'domain/shared/constants';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: constants.API_JWT_SECRET,
    });
  }

  async validate(payload) {
    return { id: payload.sub, user: payload.user };
  }
}