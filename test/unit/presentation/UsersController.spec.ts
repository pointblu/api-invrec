import { Test } from "@nestjs/testing";
import { IUsersUseCase } from "application/ports/UseCases/UsersUseCase/IUsersUseCase.interface";
import { UsersController } from "presentation/controllers/UsersController";
import { userListStubVM, userMessageDeletedStub, userStub } from "../application/stubs/users.stub";
import { IAuthUserDecorator } from "infrastructure/guards/user.guard.interface";

describe("UsersController", () => {
    let control: UsersController;
    let serviceMock = {
        createUser: jest.fn(),
        getUsersPag: jest.fn(),
        getUserById: jest.fn(),
        getProfile: jest.fn(),
        updateUser: jest.fn(),
        deleteUser: jest.fn()
    };
    beforeEach(async () => {
        const user = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: IUsersUseCase,
                    useValue: serviceMock
                }
            ]
        }).compile();

        control = user.get<UsersController>(UsersController)
    })


    it('test UserController', () => {
        expect(control).toBeTruthy();
    })

    describe('created', () => {
        it('created success', async () => {
            // Preparacion de data
            const createUserDto = {
                name: 'Pepe Perez',
                role: 'user',
                email: 'pepe@email.com',
                password: '123456',
                salt: '123456',
                status: true,
                verificationCode: '1234567',
                recuperationCode: '1234367'
            };
            jest.spyOn(serviceMock, 'createUser').mockResolvedValue(userStub);
            // Ejecucion de test
            const result = await control.created(createUserDto);
            // Verificación
            expect(result).toEqual(userStub);
        })
    })

    describe('getUserspag', () => {
        it('getUserspag success', async () => {
            // Preparacion de data
            const qs = {
                take: 10,
                pag: 1,
            };
            jest.spyOn(serviceMock, 'getUsersPag').mockResolvedValue(userListStubVM);
            // Ejecucion de test
            const result = await control.getUserspag(qs);
            // Verificación
            expect(result).toEqual(userListStubVM);
        })
    })


    describe('getUserById', () => {
        it('getUserById success', async () => {
            // Preparacion de data
            const userId = '6f8d0a6d9d6d1d0a6d9d6d1d'
            jest.spyOn(serviceMock, 'getUserById').mockResolvedValue(userStub);
            // Ejecucion de test
            const result = await control.getUserById(userId);
            // Verificación
            expect(result).toEqual(userStub);
        })
    })


    describe('profile', () => {
        it('profile success', async () => {
            // Preparacion de data
            const userFromToken: IAuthUserDecorator = {
                email: 'pepe@email.com',
                name: 'Pepe Perez',
                _id: '6f8d0a6d9d6d1d0a6d9d6d1d',
                iat: null,
                exp: null
            };
            jest.spyOn(serviceMock, 'getProfile').mockResolvedValue(userStub);
            // Ejecucion de test
            const result = await control.getProfile(userFromToken);
            // Verificación
            expect(result).toEqual(userStub);
        })
    })

    describe('update', () => {
        it('update success', async () => {
            // Preparacion de data
            const userId = '6f8d0a6d9d6d1d0a6d9d6d1d'
            const userUpdateDataDto = {
                name: 'Pepe Perez',
            };
            jest.spyOn(serviceMock, 'updateUser').mockResolvedValue(userStub);
            // Ejecucion de test
            const result = await control.update(userId, userUpdateDataDto);
            // Verificación
            expect(result).toEqual(userStub);
        })
    })

    describe('delete', () => {
        it('delete success', async () => {
            // Preparacion de data
            const userId = '6f8d0a6d9d6d1d0a6d9d6d1d'
            jest.spyOn(serviceMock, 'deleteUser').mockResolvedValue(userMessageDeletedStub);
            // Ejecucion de test
            const result = await control.delete(userId);
            // Verificación
            expect(result).toEqual(userMessageDeletedStub);
        })
    })
})