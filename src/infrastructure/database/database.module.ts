import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Users } from './mapper/Users.entity';
import { AppDataSource } from './data-source';
dotenv.config();

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot(AppDataSource.options as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([Users]),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }
