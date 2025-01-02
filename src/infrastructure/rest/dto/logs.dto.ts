export class CreateLogDto {
    requestId: string;
    app_name: string;
    method: string;
    url: string;
    body: string;
    params: string;
    query_params: string;
    response: string;
    error: boolean;
    error_message: string;
    timestamp: Date;
    status_code: number;
}