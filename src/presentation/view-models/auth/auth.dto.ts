import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, IsByteLength, IsNotEmpty } from "class-validator";
export class CreateLoginDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "Email of user",
        example: "admin@gmail.com",
        type: String
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "Password of user",
        example: "admin",
        type: String
    })
    password: string;
}

export class CreateRequestResetPasswordDto {
    @ApiProperty({
        type: String
    })
    @IsString()
    @IsNotEmpty()
    email: string;
}


export class CreateValidateCodeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "Codigo de recuperación de contraseña",
        example: "12345",
        type: String
    })
    code: string;
}


export class CreateResetPasswordDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "Codigo de recuperación de contraseña",
        example: "12345",
        type: String
    })
    code: string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "Password of user",
        example: "admin",
        type: String
    })
    password: string;
}