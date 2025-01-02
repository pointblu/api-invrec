import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./createUser.dto";
export class UpdateUsersDto extends PartialType(CreateUserDto) {}
