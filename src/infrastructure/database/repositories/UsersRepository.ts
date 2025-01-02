import { Injectable } from '@nestjs/common';
import { Users } from '../mapper/Users.entity';
import { BaseRepository } from './BaseRepository';
import { IUsersRepository } from 'application/ports/Repository/UsersRepository/IUsersRepository.interface';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class UsersRepository extends BaseRepository<Users> implements IUsersRepository {
    constructor(
        @InjectRepository(Users)
        repository: Repository<Users>,
        @InjectDataSource()
        dataSource: DataSource,
    ) {
        super(repository, dataSource); // Pasar ambos argumentos
    }
}
