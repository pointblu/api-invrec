/* import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsBoolean, IsString } from "class-validator";
import { CreateDeviceVM } from './createDevice.dto';
import { Devices } from 'infrastructure/database/mapper/Device.entity';
import { ResponseRequestDto } from "infrastructure/rest/dto/response-request";

export class DeviceVM {

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
        description: "Identificador del dispositivo generado por onesignal",
        type: String
    })
    playerId: string;

    @Expose()
    @ApiProperty({
        description: "Estado del dispositivo",
        type: Boolean
    })
    deviceStatus: boolean;

    @Expose()
    @ApiProperty({
        description: "Estado del envio notificaciones del dispositivo",
        type: String
    })
    mobileNotification: boolean;

    @Expose()
    @ApiProperty({
        description: "Id del usuario dueño del device",
        type: String
    })
    user: string;

    static toViewModel(module: Devices): CreateDeviceVM {
        return plainToClass(CreateDeviceVM, module, { excludeExtraneousValues: true });
    }

    static fromViewModel(mv: CreateDeviceVM): Devices {
        delete mv.id;
        return new Devices({
            ...mv
        });
    }
}

export class ResponseDeviceVM extends ResponseRequestDto {
    @ApiProperty({
        type: Boolean,
        default: true,
    })
    success: boolean;
    @ApiProperty({
        type: DeviceVM,
    })
    data: DeviceVM;
}

export class ResponseSendNotificationAllDeviceSubscribed extends ResponseRequestDto {
    @ApiProperty({
        type: Boolean,
        default: true,
    })
    success: boolean;
    @ApiProperty({
        type: String,
        default: 'push_notification_send_successfully',
    })
    data: string;
} */