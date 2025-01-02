import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersRepository } from 'infrastructure/database/repositories/UsersRepository';
import { Users } from 'infrastructure/database/mapper/Users.entity';
import { IUsersRepository } from 'application/ports/Repository/UsersRepository/IUsersRepository.interface';

describe('UsersRepository', () => {
    let usersRepository: IUsersRepository;
    let usersModel: Model<Users>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: IUsersRepository,
                    useClass: UsersRepository
                },
                {
                    provide: getModelToken(Users.name),
                    useValue: {
                        create: jest.fn(),
                        insertMany: jest.fn(),
                        countDocuments: jest.fn(),
                        save: jest.fn(),
                        remove: jest.fn(),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        findById: jest.fn(),
                        findOneAndUpdate: jest.fn(),
                        findOneAndDelete: jest.fn(),
                        update: jest.fn(),
                        updateMany: jest.fn(),
                        updateOne: jest.fn(),
                        deleteMany: jest.fn(),
                        deleteOne: jest.fn(),
                        aggregate: jest.fn(),
                        createIndexes: jest.fn(),
                        ensureIndexes: jest.fn(),
                    },
                },
            ],
        }).compile();

        usersRepository = module.get<IUsersRepository>(IUsersRepository);
        usersModel = module.get<Model<Users>>(getModelToken(Users.name));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(usersRepository).toBeDefined();
    });
});
