/* import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, plainToClass } from "class-transformer";
import { IsBoolean, IsByteLength, IsString } from "class-validator";
import { Devices } from 'infrastructure/database/mapper/Device.entity';

export class CreateDeviceVM {

    @Expose()
    id: string;

    @Expose()
    @IsString()
    @ApiProperty({
        description: "Identificador del dispositivo generado por onesignal",
        type: String
    })
    playerId: string;
    @Expose()
    @IsBoolean()
    @ApiProperty({
        description: "Estado del dispositivo",
        type: Boolean
    })
    deviceStatus: boolean;

    @Expose()
    @IsBoolean()
    @ApiProperty({
        description: "Estado del envio notificaciones del dispositivo",
        type: Boolean
    })
    mobileNotification: boolean;

    @Expose()
    @IsString()
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
} */