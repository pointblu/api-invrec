import { ApiProperty } from "@nestjs/swagger";

export class ResponseRequestDto{
    @ApiProperty({
        type: Boolean
    })
    success: boolean;
    @ApiProperty({
        type: String
    })
    message: string;
}

export class ResponseRequestError500Dto extends ResponseRequestDto{
    @ApiProperty({
        type: Boolean,
        default: false
    })
    success: boolean;
    @ApiProperty({
        type: String,
        description: "error inesperado"
    })
    data: string;
}