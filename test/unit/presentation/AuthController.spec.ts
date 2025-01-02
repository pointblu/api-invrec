import { Test } from "@nestjs/testing";
import { AuthController } from "presentation/controllers/AuthController";
import { userStub } from "../application/stubs/users.stub";
import { IAuthService } from "domain/services/auth/IAuthService.interface";

describe("UsersController", () => {
    let control: AuthController;
    let serviceMock = {
        login: jest.fn(),
        requestResetPassword: jest.fn(),
        validateCode: jest.fn(),
        resetPassword: jest.fn(),
    };
    beforeEach(async () => {
        const user = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: IAuthService,
                    useValue: serviceMock
                }
            ]
        }).compile();

        control = user.get<AuthController>(AuthController)
    })


    it('test AuthController', () => {
        expect(control).toBeTruthy();
    })
    describe('login', () => {
        it('login success', async () => {
            // Preparacion de data
            const createLoginDto = {
                email: 'pepe@email.com',
                password: '123456'
            };
            jest.spyOn(serviceMock, 'login').mockResolvedValue(userStub);
            // Ejecucion de test
            const result = await control.login(createLoginDto);
            // Verificación
            expect(result).toEqual(userStub);
        })
    })


    describe('requestResetPassword', () => {
        it('requestResetPassword success', async () => {
            // Preparacion de data
            const createLoginDto = {
                email: 'pepe@email.com',
            };
            jest.spyOn(serviceMock, 'requestResetPassword').mockResolvedValue('email_request_reset_password_sent');
            // Ejecucion de test
            const result = await control.requestResetPassword(createLoginDto);
            // Verificación
            expect(result).toEqual('email_request_reset_password_sent');
        })
    })


    describe('validateCode', () => {
        it('validateCode success', async () => {
            // Preparacion de data
            const createValidateCodeDto = {
                code: '1234367',
            };
            jest.spyOn(serviceMock, 'validateCode').mockResolvedValue('code_valid');
            // Ejecucion de test
            const result = await control.validateCode(createValidateCodeDto);
            // Verificación
            expect(result).toEqual('code_valid');
        })
    })

    describe('resetPassword', () => {
        it('resetPassword success', async () => {
            // Preparacion de data
            const createResetPasswordDto = {
                code: '1234367',
                password: '123456'
            };
            jest.spyOn(serviceMock, 'resetPassword').mockResolvedValue('password_reseted');
            // Ejecucion de test
            const result = await control.resetPassword(createResetPasswordDto);
            // Verificación
            expect(result).toEqual('password_reseted');
        })
    })
})