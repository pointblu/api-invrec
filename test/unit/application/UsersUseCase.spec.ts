import { Test } from "@nestjs/testing"
import { IUsersRepository } from "application/ports/Repository/UsersRepository/IUsersRepository.interface";
import { IUsersUseCase } from "application/ports/UseCases/UsersUseCase/IUsersUseCase.interface";
import { UsersUseCase } from "application/use-cases/UsersUseCase/UsersUseCase";
import { userDeleteStub, userListStub, userListStubVM, userSearchUpdateStub, userStub, userUpdatedStub } from "./stubs/users.stub";
import { HttpException, HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { MESSAGE_RESPONSES } from "domain/shared/message_errors";
import { UserRole } from "domain/shared/enums/user-role.enum";
import { CreateUserDto } from "presentation/view-models/users/createUser.dto";

describe('IUsersUseCase', () => {
    let useCase: IUsersUseCase;
    // Metodos disponibles en  IRepository
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
    beforeEach(async () => {
        const user = await Test.createTestingModule({
            providers: [
                {
                    provide: IUsersUseCase,
                    useClass: UsersUseCase
                },
                {
                    provide: IUsersRepository,
                    useValue: repositoryMock
                }
            ],
        }).compile()
        useCase = user.get<IUsersUseCase>(IUsersUseCase);
    })
    afterEach(() => {
        jest.clearAllMocks(); // Esto limpiará todos los mocks después de cada prueba.
    });
    it('should be defined', () => {
        expect(useCase).toBeDefined()
    })
    describe('getUsers', () => {
        it('getUsers Success', async () => {
            // Preparacion de data
            jest.spyOn(repositoryMock, 'findAll').mockResolvedValue(userListStub);
            // Ejecucion de test
            const result = await useCase.getUsers();
            // Verificación
            expect(result).toEqual(userListStub);
            expect(repositoryMock.findAll).toHaveBeenCalledWith();
            expect(repositoryMock.findAll).toHaveBeenCalledTimes(1);
        })
    })
    describe('getProfile', () => {
        it('Profile existe', async () => {
            // Preparacion de data
            const userId = '6f8d0a6d9d6d1d0a6d9d6d1d';
            jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(userStub);
            // Ejecucion de test
            const result = await useCase.getProfile(userId);
            // Verificación
            expect(result).toEqual(userStub);
            expect(repositoryMock.findOne).toHaveBeenCalledWith(userId);
            expect(repositoryMock.findOne).toHaveBeenCalledTimes(1);
        })
        it('Profile no existe', async () => {
            // Preparacion de data
            const userId = '6f8d0a6d9d6d1d0a6d9d6d1d';
            jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(null);
            // Ejecucion de test y Verificación
            await expect(useCase.getProfile(userId)).rejects.toThrowError(
                new HttpException(
                    { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
                    HttpStatus.NOT_FOUND,
                )
            );
        })
        it('Profile - error 500', async () => {
            // Preparacion de data
            const userId = '6f8d0a6d9d6d1d0a6d9d6d1d';
            jest.spyOn(repositoryMock, 'findOne').mockRejectedValue(new Error('Error al buscar el usuario en la BD'));
            // Ejecucion de test y Verificación
            await expect(useCase.getProfile(userId)).rejects.toThrow(InternalServerErrorException);
        })
    })
    describe('getUserById', () => {
        it('User existe', async () => {
            // Preparacion de data
            const userId = '6f8d0a6d9d6d1d0a6d9d6d1d';
            jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(userStub);
            // Ejecucion de test
            const result = await useCase.getUserById(userId);
            // Verificación
            expect(result).toEqual(userStub);
            expect(repositoryMock.findOne).toHaveBeenCalledWith(userId);
            expect(repositoryMock.findOne).toHaveBeenCalledTimes(1);
        })
        it('User no existe', async () => {
            // Preparacion de data
            const userId = '6f8d0a6d9d6d1d0a6d9d6d1d';
            jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(null);
            // Ejecucion de test y Verificación
            await expect(useCase.getUserById(userId)).rejects.toThrowError(
                new HttpException(
                    { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
                    HttpStatus.NOT_FOUND,
                )
            );
        })
        it('User - error 500', async () => {
            // Preparacion de data
            const userId = '6f8d0a6d9d6d1d0a6d9d6d1d';
            jest.spyOn(repositoryMock, 'findOne').mockRejectedValue(new Error('Error al buscar el usuario en la BD'));
            // Ejecucion de test y Verificación
            await expect(useCase.getUserById(userId)).rejects.toThrow(InternalServerErrorException);
        })
    })
    describe('getUserByIdRaw', () => {
        it('User Raw existe', async () => {
            // Preparacion de data
            const userId = '6f8d0a6d9d6d1d0a6d9d6d1d';
            jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(userStub);
            // Ejecucion de test
            const result = await useCase.getUserByIdRaw(userId);
            // Verificación
            expect(result).toEqual(userStub);
            expect(repositoryMock.findOne).toHaveBeenCalledWith(userId);
            expect(repositoryMock.findOne).toHaveBeenCalledTimes(1);
        })
        it('User Raw no existe', async () => {
            // Preparacion de data
            const userId = '6f8d0a6d9d6d1d0a6d9d6d1d';
            jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(null);
            // Ejecucion de test y Verificación
            await expect(useCase.getUserByIdRaw(userId)).rejects.toThrowError(
                new HttpException(
                    { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
                    HttpStatus.NOT_FOUND,
                )
            );
        })
        it('User Raw - error 500', async () => {
            // Preparacion de data
            const userId = '6f8d0a6d9d6d1d0a6d9d6d1d';
            jest.spyOn(repositoryMock, 'findOne').mockRejectedValue(new Error('Error al buscar el usuario en la BD'));
            // Ejecucion de test y Verificación
            await expect(useCase.getUserByIdRaw(userId)).rejects.toThrow(InternalServerErrorException);
        })
    })
    describe('getUserByEmail', () => {
        it('UserEmail existe', async () => {
            // Preparacion de data
            const email = 'pepe@email.com';
            jest.spyOn(repositoryMock, 'findOneWithFilter').mockResolvedValue(userStub);
            // Ejecucion de test
            const result = await useCase.getUserByEmail(email);
            // Verificación
            expect(result).toEqual(userStub);
            expect(repositoryMock.findOneWithFilter).toHaveBeenCalledWith({ email });
            expect(repositoryMock.findOneWithFilter).toHaveBeenCalledTimes(1);
        })
        it('UserEmail - Httpexception error', async () => {
            // Preparacion de data
            const email = 'pepe@email.com';
            jest.spyOn(repositoryMock, 'findOneWithFilter').mockRejectedValue(new HttpException('Test HTTP exception', 400));
            // Ejecucion de test y Verificación
            await expect(useCase.getUserByEmail(email)).rejects.toThrow(HttpException);
        })
        it('UserEmail - error 500', async () => {
            // Preparacion de data
            const email = 'pepe@email.com';
            jest.spyOn(repositoryMock, 'findOneWithFilter').mockRejectedValue(new Error('Error al buscar el usuario en la BD'));
            // Ejecucion de test y Verificación
            await expect(useCase.getUserByEmail(email)).rejects.toThrow(InternalServerErrorException);
        })
    })
    describe('getUserByRecuperationCode', () => {
        it('UserRecuperationCode existe', async () => {
            // Preparación de data
            const recuperationCode = '1234367';
            // Configura el mock para findOneByAttribute en lugar de findOneWithFilter
            jest.spyOn(repositoryMock, 'findOneByAttribute').mockResolvedValue(userStub);
            // Ejecución de test
            const result = await useCase.getUserByRecuperationCode(recuperationCode);
            // Verificación
            expect(result).toEqual(userStub);
            expect(repositoryMock.findOneByAttribute).toHaveBeenCalledWith('recuperationCode', recuperationCode);
            expect(repositoryMock.findOneByAttribute).toHaveBeenCalledTimes(1);
        })
        it('UserRecuperationCode - Httpexception error', async () => {
            // Preparación de data
            const recuperationCode = '1234367';
            jest.spyOn(repositoryMock, 'findOneByAttribute').mockRejectedValue(new HttpException('Test HTTP exception', 400));
            // Ejecución de test y Verificación
            await expect(useCase.getUserByRecuperationCode(recuperationCode)).rejects.toThrow(HttpException);
        })
        it('UserRecuperationCode - error 500', async () => {
            // Preparación de data
            const recuperationCode = '1234367';
            jest.spyOn(repositoryMock, 'findOneByAttribute').mockRejectedValue(new Error('Error al buscar el usuario en la BD'));
            // Ejecución de test y Verificación
            await expect(useCase.getUserByRecuperationCode(recuperationCode)).rejects.toThrow(InternalServerErrorException);
        })
    })
    describe('getUsersPag', () => {
        it('Listado exitoso', async () => {
            // Preparación de data
            const take = 10;
            const page = 1;
            const filter = {
                role: UserRole.USER
            };
            // Configura el mock para findAllWithPaginate
            jest.spyOn(repositoryMock, 'findAllWithPaginate').mockResolvedValue(userListStubVM);
            // Ejecución de test
            const result = await useCase.getUsersPag(take, page, filter);
            // Verificación
            expect(result.result).toEqual(userListStubVM.result);
            expect(result.count).toBe(userListStubVM.count);
            expect(result.pages).toBe(userListStubVM.pages);
            expect(repositoryMock.findAllWithPaginate).toHaveBeenCalledWith(page, take, filter);
        });
        it('getUsersPag - Httpexception error', async () => {
            // Preparación de data
            const take = 10;
            const page = 1;
            const filter = {
                role: UserRole.USER
            };
            jest.spyOn(repositoryMock, 'findAllWithPaginate').mockRejectedValue(new HttpException('Test HTTP exception', 400));
            // Ejecución de test y Verificación
            await expect(useCase.getUsersPag(take, page, filter)).rejects.toThrow(HttpException);
        })
        it('getUsersPag - error 500', async () => {
            // Preparación de data
            const take = 10;
            const page = 1;
            const filter = {
                role: UserRole.USER
            };
            jest.spyOn(repositoryMock, 'findAllWithPaginate').mockRejectedValue(new Error('Error al buscar el usuario en la BD'));
            // Ejecución de test y Verificación
            await expect(useCase.getUsersPag(take, page, filter)).rejects.toThrow(InternalServerErrorException);
        })
    })
    describe('createUser', () => {
        it('Creación exitosa', async () => {
            // Preparación de data
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
            // Configura el mock para el método create
            jest.spyOn(repositoryMock, 'create').mockResolvedValue(userStub);
            // Mockea getUserByEmail para simular que no existe un usuario con el mismo email
            jest.spyOn(useCase, 'getUserByEmail').mockResolvedValue(null);
            // Ejecución de test
            const result = await useCase.createUser(createUserDto);
            // Verificación
            expect(result).toEqual(userStub);
            expect(repositoryMock.create).toHaveBeenCalledWith(createUserDto);
            expect(repositoryMock.create).toHaveBeenCalledTimes(1);
        });
        it('Email duplicado - Httpexception error', async () => {
            // Preparación de data
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
            jest.spyOn(useCase, 'getUserByEmail').mockResolvedValue(userStub);
            jest.spyOn(repositoryMock, 'create').mockRejectedValue(new HttpException(
                { message: MESSAGE_RESPONSES.USERS.EMAIL_DUPLICATED },
                HttpStatus.UNPROCESSABLE_ENTITY,
            ));
            // Ejecución de test y Verificación
            await expect(useCase.createUser(createUserDto)).rejects.toThrow(HttpException);
        })
        it('CreateUser - error 500', async () => {
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
            jest.spyOn(useCase, 'getUserByEmail').mockResolvedValue(null);
            jest.spyOn(repositoryMock, 'create').mockRejectedValue(new Error('Error al buscar el usuario en la BD'));
            // Ejecución de test y Verificación
            await expect(useCase.createUser(createUserDto)).rejects.toThrow(InternalServerErrorException);
        })
    })
    describe('updateUser', () => {
        it('Actualización exitosa', async () => {
            // Preparación de datos
            const userId = '6f8d0a6d9d6d1d0a6d9d6d1d';
            const updateUserDto = {
                email: 'newemail@example.com',
                name: 'John Doe',
            };
            // Mock de getUserByIdRaw para simular que el usuario existe
            jest.spyOn(useCase, 'getUserByIdRaw').mockResolvedValue(userStub);
            // Mock de getUserByEmail para simular que el email no está en uso
            jest.spyOn(useCase, 'getUserByEmail').mockResolvedValue(userStub);
            // Mock del método update
            jest.spyOn(repositoryMock, 'update').mockResolvedValue(userUpdatedStub);
            // Mock de getUserById para retornar el usuario actualizado (puedes ajustar este stub)
            jest.spyOn(useCase, 'getUserById').mockResolvedValue(userUpdatedStub);
            // Ejecución del test
            const result = await useCase.updateUser(userId, updateUserDto);
            // Verificaciones
            expect(result).toEqual(userUpdatedStub);
            expect(repositoryMock.update).toHaveBeenCalledWith(userId, updateUserDto);
            expect(repositoryMock.update).toHaveBeenCalledTimes(1);
        });
        it('Actualización Con email duplicado o usado por otro usuario', async () => {
            // Preparación de datos
            const userId = '6f8d0a6d9d6d1d0a6d9d6d1c';
            const updateUserDto = {
                email: 'pepe@email.com',
                name: 'John Doe',
            };
            // Mock de getUserByIdRaw para simular que el usuario existe
            jest.spyOn(useCase, 'getUserByIdRaw').mockResolvedValue(userSearchUpdateStub);
            // Mock de getUserByEmail para simular que el email no está en uso
            jest.spyOn(useCase, 'getUserByEmail').mockResolvedValue(userStub);
            // Mock del método update
            jest.spyOn(repositoryMock, 'update').mockRejectedValue(new HttpException(
                { message: MESSAGE_RESPONSES.USERS.EMAIL_DUPLICATED },
                HttpStatus.UNPROCESSABLE_ENTITY,
            ));
            // Ejecución de test y Verificación
            await expect(useCase.updateUser(userId, updateUserDto)).rejects.toThrow(HttpException);
        });
        it('Actualización Error 500', async () => {
            // Preparación de datos
            const userId = '6f8d0a6d9d6d1d0a6d9d6d1d';
            const updateUserDto = {
                email: 'pepe@email.com',
                name: 'John Doe',
            };
            // Mock de getUserByIdRaw para simular que el usuario existe
            jest.spyOn(useCase, 'getUserByIdRaw').mockResolvedValue(userStub);
            // Mock de getUserByEmail para simular que el email no está en uso
            jest.spyOn(useCase, 'getUserByEmail').mockResolvedValue(userStub);
            // Mock del método update
            jest.spyOn(repositoryMock, 'update').mockRejectedValue(new Error('Error al buscar el usuario en la BD'));
            // Ejecución de test y Verificación
            await expect(useCase.updateUser(userId, updateUserDto)).rejects.toThrow(InternalServerErrorException);
        });
    })
})