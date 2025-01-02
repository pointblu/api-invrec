/* import { ApiProperty } from "@nestjs/swagger";
import { Exclude, plainToClass } from "class-transformer";
import { IsString, IsBoolean } from "class-validator";
import { Devices } from "infrastructure/database/mapper/Device.entity";

export class UpdateDeviceVM {
    @Exclude()
    id: string = null;

    @IsString()
    @ApiProperty({
        description: "Identificador del dispositivo generado por onesignal",
        type: String
    })
    uuidDevice: string;

    @IsBoolean()
    @ApiProperty({
        description: "Estado del dispositivo",
        type: Boolean
    })
    deviceStatus: boolean;

    @IsBoolean()
    @ApiProperty({
        description: "Estado del envio notificaciones del dispositivo",
        type: String
    })
    mobileNotification: boolean;

    @IsString()
    @ApiProperty({
        description: "Id del usuario dueño del device",
        type: String
    })
    user: string;
    static toViewModel(module: Devices): UpdateDeviceVM {
        return plainToClass(UpdateDeviceVM, module, { excludeExtraneousValues: true });
    }

    static fromViewModel(mv: UpdateDeviceVM): Devices {
        return new Devices({
            ...mv
        });
    }
} */