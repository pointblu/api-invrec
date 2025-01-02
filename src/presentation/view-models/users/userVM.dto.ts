import { ApiProperty } from "@nestjs/swagger";
import { Expose, plainToClass } from "class-transformer";
import { ResponseRequestDto } from '../../../infrastructure/rest/dto/response-request';
import { Users } from 'infrastructure/database/mapper/Users.entity';


export class UserVM {

    @Expose()
    @ApiProperty({
        description: "Id of user",
        example: "d46f7074-5f44-44d2-8b79-92cb5d63bbc0",
        required: false,
        type: String
    })
    id: string;

    @Expose()
    @ApiProperty({
        description: "Name of user",
        example: "admin",
        type: String
    })
    name: string;

    @Expose()
    @ApiProperty({
        description: "Email of user",
        example: "admin",
        type: String
    })
    email: string;

    @Expose()
    @ApiProperty({
        description: "Password of user",
        example: "admin",
        type: String
    })
    password: string;

    @Expose()
    @ApiProperty({
        description: "Check if the user is active or inactive",
    })
    status: boolean = true;
    @ApiProperty({
        type: String
    })
    recuperationCode?: string;
    @ApiProperty({
        type: String
    })
    salt: string;
    static toViewModel(module: Users): UserVM {
        const result = plainToClass(UserVM, module, { excludeExtraneousValues: true });
        return result;
    }

    static fromViewModel(mv: UserVM): Users {
        return plainToClass(Users, mv, { excludeExtraneousValues: true });
    }
}

export class ResponseUserVM extends ResponseRequestDto {
    @ApiProperty({
        type: Boolean,
        default: true,
    })
    success: boolean;
    @ApiProperty({
        type: UserVM,
    })
    data: UserVM;
}