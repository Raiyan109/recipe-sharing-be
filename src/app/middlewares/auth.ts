import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model'
import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../modules/user/user.interface';
import AppError from '../errors/AppError';

import sendResponse from '../utils/sendResponse';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];

        // checking if the token is missing
        if (!token) {
            // throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
            return sendResponse(res, {
                success: false,
                statusCode: httpStatus.UNAUTHORIZED,
                message: 'You have no access to this route',
                // data: [],
            });
        }

        // checking if the given token is valid
        const decoded = jwt.verify(
            token,
            config.jwt_secret as string,
        ) as JwtPayload;

        const { role, userId, iat } = decoded;

        // checking if the user is exist
        const user = await User.isUserExistsByEmail(userId.email);

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
        }


        // if (
        //   user.passwordChangedAt &&
        //   User.isJWTIssuedBeforePasswordChanged(
        //     user.passwordChangedAt,
        //     iat as number,
        //   )
        // ) {
        //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
        // }

        if (requiredRoles && !requiredRoles.includes(role)) {
            // throw new AppError(
            //     httpStatus.UNAUTHORIZED,
            //     'You are not authorized  hi!',
            // );
            sendResponse(res, {
                success: false,
                statusCode: httpStatus.UNAUTHORIZED,
                message: 'You have no access to this route',
                // data: [],
            });
        }

        // req.user = decoded;
        req.user = decoded as JwtPayload;
        next();
    });
};

export default auth;