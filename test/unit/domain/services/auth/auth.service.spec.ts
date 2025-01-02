import { Test } from "@nestjs/testing";
import { HttpModule } from "@nestjs/axios";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { IAuthService } from "domain/services/auth/IAuthService.interface";
import { AuthService } from "domain/services/auth/auth.service";
import { IEmailService } from "domain/services/email/IEmail.interface";
import { EmailService } from "domain/services/email/email.service";
import { UsersModule } from "infrastructure/ioc/users.module";
import { JwtStrategy } from "infrastructure/strategies/jwt.strategy";
import { LocalStrategy } from "infrastructure/strategies/local.strategy";
import { constants } from 'domain/shared/constants';
import { IUsersUseCase } from "application/ports/UseCases/UsersUseCase/IUsersUseCase.interface";
import { resultGenerateAccessToken, userStub } from "../../../application/stubs/users.stub";
import { MongooseModule, getModelToken } from "@nestjs/mongoose";
import { UsersSchema } from "infrastructure/database/mapper/Users.entity";
import { UsersUseCase } from "application/use-cases/UsersUseCase/UsersUseCase";
import { IUsersRepository } from "application/ports/Repository/UsersRepository/IUsersRepository.interface";
import { HttpException, HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { MESSAGE_RESPONSES } from "domain/shared/message_errors";
jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashed_password'),
    compare: jest.fn().mockResolvedValue(true),
    compareSync: jest.fn().mockReturnValue(true),
}));
const jwtServiceMock = {
    sign: jest.fn().mockReturnValue(resultGenerateAccessToken.accessToken),
    verify: jest.fn().mockReturnValue({ /* tu payload desencriptado simulado */ }),
};
describe('AuthService', () => {
    let service: IAuthService;
    let usersUseCase: IUsersUseCase;
    let repositoryMock = {
        create: jest.fn(),
        createMany: jest.fn(),
        findAll: jest.fn(),
        findAllWithPaginate: jest.fn(),
        findOne: jest.fn(),
        findOneByAttribute: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
        delete: jest.fn(),
        deleteMany: jest.fn(),
        count: jest.fn(),
        aggregate: jest.fn(),
        replaceOne: jest.fn(),
        createIndex: jest.fn(),
        dropIndex: jest.fn(),
        findOneWithFilter: jest.fn(),
    }
    const emailService = {
        sendEmail: jest.fn(),
    };
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: IAuthService,
                    useClass: AuthService
                },
                {
                    provide: IEmailService,
                    useValue: emailService
                },
                {
                    provide: IUsersRepository,
                    useValue: repositoryMock
                },
                {
                    provide: IUsersUseCase,
                    useClass: UsersUseCase
                },
                {
                    provide: JwtService,
                    useValue: jwtServiceMock,
                },
                LocalStrategy,
                JwtStrategy,
            ],
            imports: [
                HttpModule,
                PassportModule,
                JwtModule.register({
                    secret: constants.API_JWT_SECRET,
                    signOptions: { expiresIn: '24h' }
                })
            ],
        }).compile()
        service = module.get(IAuthService);
        usersUseCase = module.get(IUsersUseCase);
    })
    afterEach(() => {
        jest.clearAllMocks(); // Esto limpiará todos los mocks después de cada prueba.
    })
    it('should be defined', () => {
        expect(service).toBeDefined()
    })
    describe('verifyUser', () => {
        it('verifyUser Success', async () => {
            // Preparando data
            const email = 'pepe@email.com';
            const password = '123456'
            jest.spyOn(usersUseCase, 'getUserByEmail').mockResolvedValue(userStub);
            // Ejecución de test
            const result = await service.verifyUser(email, password);
            // Validación de resultados
            expect(result).toEqual(userStub);
            expect(usersUseCase.getUserByEmail).toHaveBeenCalledWith(email);
            expect(usersUseCase.getUserByEmail).toHaveBeenCalledTimes(1);
        })
        it('verifyUser user not found', async () => {
            // Preparando data
            const email = 'pepe@email.com';
            const password = '123456'
            jest.spyOn(usersUseCase, 'getUserByEmail').mockResolvedValue(null);
            // Ejecución de test y validación de resultados
            await expect(service.verifyUser(email, password)).rejects.toThrowError(
                new HttpException(
                    { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
                    HttpStatus.NOT_FOUND,
                )
            );
        })
        it('verifyUser password incorrect', async () => {
            // Preparando data
            const email = 'pepe@email.com';
            const password = '1232256'
            jest.spyOn(usersUseCase, 'getUserByEmail').mockResolvedValue(userStub);
            // Redefinir el comportamiento de compareSync para esta prueba
            require('bcrypt').compareSync.mockReturnValue(false);
            // Ejecución de test y validación de resultados
            await expect(service.verifyUser(email, password)).rejects.toThrowError(
                new HttpException(
                    { message: MESSAGE_RESPONSES.USERS.PASSWORD_INCORRECT },
                    HttpStatus.NOT_FOUND,
                )
            );
            // Restaurar el comportamiento original después de la prueba si es necesario
            require('bcrypt').compareSync.mockReturnValue(true);
        })
        it('verifyUser error 500', async () => {
            // Preparando data
            const email = 'pepe@email.com';
            const password = '1232256'
            jest.spyOn(usersUseCase, 'getUserByEmail').mockRejectedValue(new Error('Error al buscar el usuario en la BD'));
            // Ejecución de test y validación de resultados
            await expect(service.verifyUser(email, password)).rejects.toThrowError(InternalServerErrorException)
        })
    })
    describe('generateAccessToken', () => {
        it('generateAccessToken Success', async () => {
            // Act
            const result = await service.generateAccessToken(userStub);
            // Assert
            expect(result).toEqual(resultGenerateAccessToken);
        })
    })

    describe('login', () => {
        it('login Success', async () => {
            // Arrange
            const email = 'pepe@email.com';
            const password = '123456'
            jest.spyOn(service, 'verifyUser').mockResolvedValue(userStub);
            jest.spyOn(service, 'generateAccessToken').mockResolvedValue(resultGenerateAccessToken);
            // Act
            const result = await service.login(email, password);
            // Assert
            expect(result).toEqual(resultGenerateAccessToken);
        })
        it('login Error HttpException', async () => {
            // Arrange
            const email = 'pepe2@email.com';
            const password = '123456'
            jest.spyOn(service, 'verifyUser').mockRejectedValue(new HttpException(
                { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
                HttpStatus.NOT_FOUND,
            ));
            // Act
            await expect(service.login(email, password)).rejects.toThrowError(
                new HttpException(
                    { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
                    HttpStatus.NOT_FOUND,
                )
            );
        })
        it('login Error 500', async () => {
            // Arrange
            const email = 'pepe2@email.com';
            const password = '123456'
            jest.spyOn(service, 'verifyUser').mockRejectedValue(new Error('Error al buscar el usuario en la BD'));
            await expect(service.login(email, password)).rejects.toThrowError(InternalServerErrorException)
        })
    })

    describe('requestResetPassword', () => {
        it('requestResetPassword Success', async () => {
            // Arrange
            const email = 'pepe@email.com';
            jest.spyOn(usersUseCase, 'getUserByEmail').mockResolvedValue(userStub);
            jest.spyOn(usersUseCase, 'updateUser').mockResolvedValue(userStub);
            jest.spyOn(emailService, 'sendEmail');
            // Act
            const result = await service.requestResetPassword(email);
            // Assert
            expect(result).toEqual('email_request_reset_password_sent');
        })
        it('requestResetPassword User not found', async () => {
            const email = 'pepe@email.com';
            jest.spyOn(usersUseCase, 'getUserByEmail').mockResolvedValue(null);
            // Act
            await expect(service.requestResetPassword(email)).rejects.toThrowError(
                new HttpException(
                    { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
                    HttpStatus.NOT_FOUND,
                )
            );
        })
        it('requestResetPassword Error HttpException', async () => {
            const email = 'pepe2@email.com';
            jest.spyOn(usersUseCase, 'getUserByEmail').mockResolvedValue(userStub);
            jest.spyOn(usersUseCase, 'updateUser').mockRejectedValue(new HttpException(
                { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
                HttpStatus.NOT_FOUND,
            ));
            await expect(service.requestResetPassword(email)).rejects.toThrowError(
                new HttpException(
                    { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
                    HttpStatus.NOT_FOUND,
                )
            );
        })
        it('requestResetPassword Error 500', async () => {
            const email = 'pepe@email.com';
            jest.spyOn(usersUseCase, 'getUserByEmail').mockRejectedValue(new Error('Error al buscar el usuario en la BD'));
            await expect(service.requestResetPassword(email)).rejects.toThrowError(InternalServerErrorException)
        })
    })


    describe('validateCode', () => {
        it('validateCode Success', async () => {
            // Arrange
            const code = '1234367';
            jest.spyOn(usersUseCase, 'getUserByRecuperationCode').mockResolvedValue(userStub);
            // Act
            const result = await service.validateCode(code);
            // Assert
            expect(result).toEqual('code_valid');
        })
        it('validateCode User not found', async () => {
            const code = '1234367';
            jest.spyOn(usersUseCase, 'getUserByRecuperationCode').mockResolvedValue(null);
            // Act
            await expect(service.validateCode(code)).rejects.toThrowError(
                new HttpException(
                    { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
                    HttpStatus.NOT_FOUND,
                )
            );
        })
        it('validateCode Error HttpException', async () => {
            const code = '1234367';
            jest.spyOn(usersUseCase, 'getUserByRecuperationCode').mockRejectedValue(new HttpException(
                { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
                HttpStatus.NOT_FOUND,
            ));
            await expect(service.validateCode(code)).rejects.toThrowError(
                new HttpException(
                    { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
                    HttpStatus.NOT_FOUND,
                )
            );
        })
        it('requestResetPassword Error 500', async () => {
            const code = '1234367';
            jest.spyOn(usersUseCase, 'getUserByRecuperationCode').mockRejectedValue(new Error('Error al buscar el usuario en la BD'));
            await expect(service.validateCode(code)).rejects.toThrowError(InternalServerErrorException)
        })
    })

    describe('resetPassword', () => {
        it('resetPassword Success', async () => {
            // Arrange
            const code = '1234367';
            const password = '123456';
            jest.spyOn(usersUseCase, 'getUserByRecuperationCode').mockResolvedValue(userStub);
            jest.spyOn(usersUseCase, 'updateUser').mockResolvedValue(userStub);
            // Act
            const result = await service.resetPassword(code, password);
            // Assert
            expect(result).toEqual('password_reseted');
        })
        it('resetPassword User not found', async () => {
            const code = '1234367';
            const password = '123456';
            jest.spyOn(usersUseCase, 'getUserByRecuperationCode').mockResolvedValue(null);
            // Act
            await expect(service.resetPassword(code, password)).rejects.toThrowError(
                new HttpException(
                    { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
                    HttpStatus.NOT_FOUND,
                )
            );
        })
        it('resetPassword Error HttpException', async () => {
            const code = '1234367';
            const password = '123456';
            jest.spyOn(usersUseCase, 'getUserByRecuperationCode').mockRejectedValue(new HttpException(
                { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
                HttpStatus.NOT_FOUND,
            ));
            await expect(service.resetPassword(code, password)).rejects.toThrowError(
                new HttpException(
                    { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
                    HttpStatus.NOT_FOUND,
                )
            );
        })
        it('requestResetPassword Error 500', async () => {
            const code = '1234367';
            const password = '123456';
            jest.spyOn(usersUseCase, 'getUserByRecuperationCode').mockRejectedValue(new Error('Error al buscar el usuario en la BD'));
            await expect(service.resetPassword(code, password)).rejects.toThrowError(InternalServerErrorException)
        })
    })
})