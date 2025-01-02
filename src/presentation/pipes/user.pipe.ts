import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { FilterListUserDto } from '../view-models/users/pipeUser.dto';
@Injectable()
export class ValidateFilterListUserPipe implements PipeTransform {
    transform(qs: FilterListUserDto, metadata: ArgumentMetadata) {
        const toReturn: any = {}
        toReturn.pag = parseInt(qs.pag + '');
        toReturn.take = parseInt(qs.take + '');
        return toReturn;
    }
}
