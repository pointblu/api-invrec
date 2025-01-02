import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateLoginDto, CreateRequestResetPasswordDto, CreateValidateCodeDto, CreateResetPasswordDto } from '../view-models/auth/auth.dto';
import { AuthLoginResponseError422, AuthLoginResponseSuccess, AuthRequestResetPasswordResponseSuccess, AuthResetPasswordResponseError422, AuthResetPasswordResponseSuccess, AuthValidateCodeResponseError422, AuthValidateCodeResponseSuccess } from "../view-models/auth/auth-response.dto";
import { ResponseRequestError500Dto } from "infrastructure/rest/dto/response-request";
import { IAuthService } from '../../domain/services/auth/IAuthService.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: IAuthService
    ) { }

    @Post('login')
    @ApiOperation({ summary: 'Inicio de sesión' })
    @ApiResponse({
        type: AuthLoginResponseSuccess,
        status: 200,
        description: 'Respuesta exitosa',
    })
    @ApiResponse({
        type: AuthLoginResponseError422,
        status: 422,
        description: 'Respuesta con error controlado por el api',
    })
    @ApiResponse({
        type: ResponseRequestError500Dto,
        status: 500,
        description: 'Respuesta con error inesperado',
    })
    async login(@Body() createLoginDto: CreateLoginDto) {
        return await this.authService.login(createLoginDto.email, createLoginDto.password);
    }

    @Post('request-reset-password')
    @ApiOperation({ summary: 'Inicia el proceso de recuperación de contraseña' })
    @ApiResponse({
        type: AuthRequestResetPasswordResponseSuccess,
        status: 200,
        description: 'Respuesta exitosa',
    })
    @ApiResponse({
        type: AuthLoginResponseError422,
        status: 422,
        description: 'Respuesta con error controlado por el api',
    })
    @ApiResponse({
        type: ResponseRequestError500Dto,
        status: 500,
        description: 'Respuesta con error inesperado',
    })
    async requestResetPassword(@Body() createRequestResetPasswordDto: CreateRequestResetPasswordDto) {
        return await this.authService.requestResetPassword(createRequestResetPasswordDto.email);
    }

    @Post('validate-code')
    @ApiResponse({
        type: AuthValidateCodeResponseSuccess,
        status: 200,
        description: 'Respuesta exitosa',
    })
    @ApiResponse({
        type: AuthValidateCodeResponseError422,
        status: 422,
        description: 'Respuesta con error controlado por el api',
    })
    @ApiResponse({
        type: ResponseRequestError500Dto,
        status: 500,
        description: 'Respuesta con error inesperado',
    })
    @ApiOperation({ summary: 'Valida el código enviado al email en el proceso de request reset password' })
    async validateCode(@Body() createValidateCodeDto: CreateValidateCodeDto) {
        return await this.authService.validateCode(createValidateCodeDto.code);
    }
    @Post('reset-password')
    @ApiResponse({
        type: AuthResetPasswordResponseSuccess,
        status: 200,
        description: 'Respuesta exitosa',
    })
    @ApiResponse({
        type: AuthResetPasswordResponseError422,
        status: 422,
        description: 'Respuesta con error controlado por el api',
    })
    @ApiResponse({
        type: ResponseRequestError500Dto,
        status: 500,
        description: 'Respuesta con error inesperado',
    })
    @ApiOperation({ summary: 'Actualización de contraseña' })
    async resetPassword(@Body() createResetPasswordDto: CreateResetPasswordDto) {
        return await this.authService.resetPassword(createResetPasswordDto.code, createResetPasswordDto.password);
    }
}