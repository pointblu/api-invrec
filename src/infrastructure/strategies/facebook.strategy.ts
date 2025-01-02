// facebook.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL,
      profileFields: ['name', 'email'],
      scope: ['email']
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: Function) {
    const { name, emails, photos, id } = profile;
    const user = {
      facebookId: id,
      email: emails && emails[0] && emails[0].value,
      firstName: name && name.givenName,
      lastName: name && name.familyName,
      picture: photos && photos[0] && photos[0].value,
      accessToken,
      refreshToken
    };
    done(null, user);
  }
}
