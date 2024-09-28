import jwt from 'jsonwebtoken';
import { TUser } from './user.interface';

export const createToken = (
    jwtPayload: { userId: TUser; role: string },
    // jwtPayload: { userId: string; role: string },
    secret: string,
    expiresIn: string,
) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn,
    });
};