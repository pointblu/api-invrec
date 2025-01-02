import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Users } from 'infrastructure/database/mapper/Users.entity';
import { IAuthService } from 'domain/services/auth/IAuthService.interface';
import { IUsersUseCase } from 'application/ports/UseCases/UsersUseCase/IUsersUseCase.interface';
import { constants } from 'domain/shared/constants';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { MESSAGE_RESPONSES } from 'domain/shared/message_errors';
@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userUseCase: IUsersUseCase,
    private readonly jwtService: JwtService,
  ) {}
  async verifyUser(email: string, password: string): Promise<Users> {
    try {
      let user = await this.userUseCase.getUserByEmail(email);
      if (!user) {
        throw new HttpException(
          { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
          HttpStatus.NOT_FOUND,
        );
      }
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      } else {
        throw new HttpException(
          { message: MESSAGE_RESPONSES.USERS.PASSWORD_INCORRECT },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async generateAccessToken(user: Users) {
    let signOptions: JwtSignOptions = {
      secret: constants.API_JWT_SECRET,
    };
    const payload = {
      email: user.email,
      name: user.name,
      id: user.id,
    };
    return {
      accessToken: this.jwtService.sign(payload, signOptions),
    };
  }

  async login(email: string, password: string): Promise<any> {
    try {
      let user = await this.verifyUser(email, password);
      return await this.generateAccessToken(user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async requestResetPassword(email: string): Promise<string> {
    try {
      let user = await this.userUseCase.getUserByEmail(email);
      if (!user) {
        throw new HttpException(
          { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
          HttpStatus.NOT_FOUND,
        );
      }
      return 'email_request_reset_password_sent';
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async validateCode(code: string): Promise<any> {
    try {
      let user = await this.userUseCase.getUserByRecuperationCode(code);
      if (!user) {
        throw new HttpException(
          { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
          HttpStatus.NOT_FOUND,
        );
      }
      return 'code_valid';
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
  async resetPassword(code: string, password: string): Promise<any> {
    try {
      let user = await this.userUseCase.getUserByRecuperationCode(code);
      if (!user) {
        throw new HttpException(
          { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
          HttpStatus.NOT_FOUND,
        );
      }
      const passwordInsert = crypto
        .createHmac('sha256', `${user.salt}${password}${constants.API_SALT}`)
        .digest('hex');
      await this.userUseCase.updateUser(user.id, {
        ...user,
        recuperationCode: null,
        password: passwordInsert,
      });
      return 'password_reseted';
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
