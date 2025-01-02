import { Injectable, HttpException, HttpStatus, Logger, InternalServerErrorException } from '@nestjs/common';
import { IUsersRepository } from "application/ports/Repository/UsersRepository/IUsersRepository.interface";
import { IUsersUseCase } from "application/ports/UseCases/UsersUseCase/IUsersUseCase.interface";
import { Users } from "infrastructure/database/mapper/Users.entity";
import { PagVM } from "presentation/view-models/shared/PagVM.dto";
import { CreateUserDto } from 'presentation/view-models/users/createUser.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { MESSAGE_RESPONSES } from 'domain/shared/message_errors';
import { UpdateUsersDto } from 'presentation/view-models/users/updateUser.dto';
import { FindOptionsOrder } from 'typeorm';
@Injectable()
export class UsersUseCase implements IUsersUseCase {
    constructor(
        private readonly usersRepo: IUsersRepository
    ) { }

    getUsers(): Promise<Users[]> {
        return this.usersRepo.findAll();
    }
    async getProfile(id: string): Promise<Users> {
        try {
            const result = await this.usersRepo.findOne(id);
            if (!result) {
                throw new HttpException(
                    { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
                    HttpStatus.NOT_FOUND,
                );
            }
            return result;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }
    async getUserById(id: string): Promise<Users> {
        try {
            const result = await this.usersRepo.findOne(id);
            if (!result) {
                throw new HttpException(
                    { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
                    HttpStatus.NOT_FOUND,
                );
            }
            return result;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }
    async getUserByIdRaw(id: string): Promise<Users> {
        try {
            const result = await this.usersRepo.findOne(id);
            if (!result) {
                throw new HttpException(
                    { message: MESSAGE_RESPONSES.USERS.USER_NOT_FOUND },
                    HttpStatus.NOT_FOUND,
                );
            }
            return result;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }
    async getUserByEmail(email: string): Promise<Users> {
        try {
            return await this.usersRepo.findOneWithFilter({ email })
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }
    async getUserByRecuperationCode(recuperationCode: string): Promise<Users> {
        try {
            return await this.usersRepo.findOneByAttribute('recuperationCode', recuperationCode)
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }
    async getUsersPag(take: number, page: number, filter?: any): Promise<PagVM<Users>> {
        try {
            return await this.usersRepo.findAllWithPaginate(page, take, filter);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }
    async getUsersPagWithQueryBuilder(take: number, page: number, filter?: any, sort?: FindOptionsOrder<Users>, relations?: string[]): Promise<PagVM<Users>> {
        try {
            const alias = 'user';
            const selectFields = ['id', 'name', 'email', 'role']; // Agrega los campos que necesitas
            const whereConditions = filter || {};

            const { result, pages, count } = await this.usersRepo.findWithQueryBuilder(
                alias,
                selectFields.map(field => `${alias}.${field}`),
                page,
                take,
                whereConditions,
                sort,
                relations ? Object.fromEntries(relations.map(relation => [relation, relation])) : {}
            );

            return { result, pages, count };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }


    async createUser(body: CreateUserDto): Promise<Users> {
        try {
            let existsEmail = await this.getUserByEmail(body.email);
            if (existsEmail) {
                throw new HttpException(
                    { message: MESSAGE_RESPONSES.USERS.EMAIL_DUPLICATED },
                    HttpStatus.UNPROCESSABLE_ENTITY,
                );
            }
            body.salt = uuidv4();
            body.password = await bcrypt.hash(body.password, 10);
            return await this.usersRepo.create(body);
        } catch (error) {
            Logger.error(error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }
    async updateUser(userId: string, body: Partial<UpdateUsersDto>): Promise<Users> {
        try {
            const exists = await this.getUserByIdRaw(userId);
            const existsEmail = await this.getUserByEmail(body.email)
            if ((exists.id != existsEmail.id)) {
                throw new HttpException(
                    { message: MESSAGE_RESPONSES.USERS.EMAIL_DUPLICATED },
                    HttpStatus.UNPROCESSABLE_ENTITY,
                );
            }
            await this.usersRepo.update(userId, body);
            const result = await this.getUserById(userId);
            return result;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }
    async deleteUser(userId: string): Promise<{ id: string, message?: string }> {
        try {
            const exists = await this.getUserById(userId);
            await this.usersRepo.deleteOne(userId);
            return { id: String(exists.id), message: MESSAGE_RESPONSES.USERS.USER_DELETED };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }
}