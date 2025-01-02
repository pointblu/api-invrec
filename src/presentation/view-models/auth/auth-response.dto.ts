import { ApiProperty } from '@nestjs/swagger';
import { ResponseRequestDto } from '../../../infrastructure/rest/dto/response-request';
export class DataResponseSuccessLoginDto{
    @ApiProperty({
        type: String,
        default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    })
    accessToken: string;
}

export class AuthLoginResponseSuccess extends  ResponseRequestDto{
    @ApiProperty({
        type: DataResponseSuccessLoginDto,
    })
    data: DataResponseSuccessLoginDto
}

export class AuthLoginResponseError422 extends ResponseRequestDto{
    @ApiProperty({
        type: Boolean,
        default: false
    })
    success: boolean;
    @ApiProperty({
        type: String,
        description: "Errores controlados por el api y sus posibles valores son password_incorrect,user_not_found,"
    })
    data: string
}

export class AuthRequestResetPasswordResponseError422 extends ResponseRequestDto{
    @ApiProperty({
        type: String,
        description: "Errores controlados por el api y sus posibles valores son user_not_found"
    })
    data: string
}

export class AuthRequestResetPasswordResponseSuccess extends  ResponseRequestDto{
    @ApiProperty({
        type: String,
        description: "email_request_reset_password_sent",
        default: "email_request_reset_password_sent"
    })
    data: string
}

export class AuthValidateCodeResponseSuccess extends  ResponseRequestDto{
    @ApiProperty({
        type: String,
        description: "code_valid",
        default: "code_valid"
    })
    data: string
}
export class AuthValidateCodeResponseError422 extends ResponseRequestDto{
    @ApiProperty({
        type: Boolean,
        default: false
    })
    success: boolean;
    @ApiProperty({
        type: String,
        description: "Errores controlados por el api y sus posibles valores son user_not_found,code_invalid"
    })
    data: string
}



export class AuthResetPasswordResponseSuccess extends  ResponseRequestDto{
    @ApiProperty({
        type: String,
        description: "password_reseted",
        default: "password_reseted"
    })
    data: string
}
export class AuthResetPasswordResponseError422 extends ResponseRequestDto{
    @ApiProperty({
        type: Boolean,
        default: false
    })
    success: boolean;
    @ApiProperty({
        type: String,
        description: "Errores controlados por el api y sus posibles valores son user_not_found,code_invalid"
    })
    data: string
}