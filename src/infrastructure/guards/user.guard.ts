import { createParamDecorator } from '@nestjs/common';
import { decode } from 'jsonwebtoken';

export const AuthUser = createParamDecorator((data, req) => {
    const authToken = req.args[0].headers.authorization.split(' ')[1]
    return decode(authToken);
});