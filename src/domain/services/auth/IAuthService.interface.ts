import { Injectable } from '@nestjs/common';
import { Users } from 'infrastructure/database/mapper/Users.entity';

@Injectable()
export abstract class IAuthService {
  abstract verifyUser(username: string, password: any): Promise<Users>;
  abstract login(email: string, password: string): Promise<any>;
  abstract generateAccessToken(user: Users): Promise<any>;
  abstract requestResetPassword(email: string): Promise<string>;
  abstract validateCode(code: string): Promise<any>;
  abstract resetPassword(code: string, password: string): Promise<any>;
}
