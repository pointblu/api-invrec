// linkedin.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';
import { Injectable } from '@nestjs/common';
import { VerifyCallback } from 'passport-google-oauth20';
import * as dotenv from 'dotenv';
dotenv.config();
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor() {
    super(
      {
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: process.env.LINKEDIN_CALLBACK_URL,
        scope: ['email', 'profile', 'openid'],
        state: uuidv4(),
        passReqToCallback: true
      }
    );
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    process.nextTick(function () {
      const { id, emails, firstName, lastName, pictureUrl } = profile;
      const user = {
        id,
        email: emails && emails[0] && emails[0].value,
        firstName: firstName && firstName.localized && firstName.localized[Object.keys(firstName.localized)[0]],
        lastName: lastName && lastName.localized && lastName.localized[Object.keys(lastName.localized)[0]],
        picture: pictureUrl,
        accessToken,
        refreshToken
      };
      done(null, user);
    })
  }
}
