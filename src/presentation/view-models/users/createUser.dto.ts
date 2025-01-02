import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsBoolean, IsByteLength, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole } from "domain/shared/enums/user-role.enum";

export class CreateUserDto {
    @ApiProperty({
        description: "Name of user",
        example: "admin",
        type: String
    })
    @IsString()
    @IsByteLength(1, 100)
    @Expose()
    name: string;

    @ApiProperty({
        description: "Role of user",
        example: UserRole.USER,
        enum: UserRole,
        type: String
    })
    @IsString()
    @Expose()
    role: UserRole;

    @ApiProperty({
        description: "Email of user",
        example: "admin@example.com",
        type: String
    })
    @IsString()
    @IsByteLength(1, 100)
    @Expose()
    email: string;

    @ApiProperty({
        description: "Password of user",
        example: "admin",
        type: String
    })
    @IsString()
    @IsByteLength(1, 100)
    @Expose()
    password: string;

    @IsOptional()
    @IsBoolean()
    @Expose()
    @ApiProperty({
        description: "Check if the user is active or inactive",
    })
    status?: boolean = true;
    @IsOptional()
    @IsString()
    @Exclude()
    @ApiPropertyOptional({
        description: "Codigo de verificacion de cuenta",
        default: '212312',
        example: '212312',
        required: false,
        type: String,
    })
    verificationCode?: string;

    @IsOptional()
    @IsString()
    @Exclude()
    @ApiPropertyOptional({
        description: "Codigo de recuperación de cuenta",
        default: '212312',
        example: '212312',
        required: false,
        type: String,
    })
    recuperationCode?: string;
    salt?: string;
}