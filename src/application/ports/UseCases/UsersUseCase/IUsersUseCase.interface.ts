import { Injectable } from '@nestjs/common';
import { PagVM } from 'presentation/view-models/shared/PagVM.dto';
import { Users } from 'infrastructure/database/mapper/Users.entity';
import { CreateUserDto } from 'presentation/view-models/users/createUser.dto';
import { UpdateUsersDto } from 'presentation/view-models/users/updateUser.dto';
import { FindOptionsOrder } from 'typeorm';

@Injectable()
export abstract class IUsersUseCase {
    abstract getProfile(id: string): Promise<Users>;
    abstract getUsers(): Promise<Users[]>;
    abstract getUserById(id: string): Promise<Users>;
    abstract getUserByIdRaw(id: string): Promise<Users>
    abstract getUserByEmail(username: string): Promise<Users>;
    abstract getUserByRecuperationCode(recuperationCode: string): Promise<Users>;
    abstract getUsersPag(take: number, page: number, filter?: any): Promise<PagVM<Users>>
    abstract getUsersPagWithQueryBuilder(take: number, page: number, filter?: any, sort?: FindOptionsOrder<Users>, relations?: string[]): Promise<PagVM<Users>>
    abstract createUser(body: CreateUserDto): Promise<Users>;
    abstract updateUser(userId: string, body: Partial<UpdateUsersDto>): Promise<Users>;
    abstract deleteUser(userId: string): Promise<{ id: string, message?: string }>
}