import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "infrastructure/database/mapper/Users.entity";
import { IUsersRepository } from "application/ports/Repository/UsersRepository/IUsersRepository.interface";
import { IUsersUseCase } from "application/ports/UseCases/UsersUseCase/IUsersUseCase.interface";
import { UsersUseCase } from "application/use-cases/UsersUseCase/UsersUseCase";
import { UsersController } from "presentation/controllers/UsersController";
import { UsersRepository } from "infrastructure/database/repositories/UsersRepository";

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([Users]), // Reemplaza MongooseModule con TypeOrmModule
    ],
    controllers: [UsersController],
    providers: [
        {
            provide: IUsersUseCase,
            useClass: UsersUseCase
        },
        {
            provide: IUsersRepository,
            useClass: UsersRepository
        },
    ],
    exports: [
        {
            provide: IUsersUseCase,
            useClass: UsersUseCase
        },
        {
            provide: IUsersRepository,
            useClass: UsersRepository
        }
    ]
})
export class UsersModule { }
