import { Expose } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";
import { type } from 'os';
import { ResponseRequestDto } from '../../../infrastructure/rest/dto/response-request';
import { UserVM } from '../users/userVM.dto';

export class PagVM<T> {
    @Expose()
    @ApiProperty({
        description: "all data for pagine",
        example: [{ id: "id" }, { id: "id" }],
        type: Object
    })
    result: T[];

    @Expose()
    @ApiProperty({
        description: "number of data row",
        example: "1",
        type: Number,
    })
    count: number;

    @Expose()
    @ApiProperty({
        description: "number of pages",
        example: "1",
        type: Number,
    })
    pages: number;

    static toViewModel<T>(data: T[], count: number, pages: number): PagVM<T> {
        let response = new PagVM<T>();
        response.count = count;
        response.result = data;
        response.pages = pages;
        return response;
    }
}


export class ResponsePagVM extends ResponseRequestDto {
    @ApiProperty({
        type: Boolean,
        default: true,
    })
    success: boolean;
    @ApiProperty({
        type: PagVM<UserVM>,
    })
    data: PagVM<UserVM>;
}