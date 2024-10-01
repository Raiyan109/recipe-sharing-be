import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginUser, TUser } from "./user.interface";
import { User } from './user.model'
import { createToken } from "./user.utils";
import config from "../../config";

const createUserIntoDB = async (payload: TUser) => {
    try {
        let user = await User.create(payload)

        return user
    } catch (error) {
        console.log(error);
    }
}

const login = async (payload: TLoginUser) => {
    // checking if the user is exist
    const user = await User.isUserExistsByEmail(payload.email)

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist !');
    }

    //checking if the password is correct
    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    //create token and sent to the  client
    const jwtPayload = {
        userId: user,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_secret as string,
        config.jwt_secret_expires_in as string,
    );

    // const refreshToken = createToken(
    //   jwtPayload,
    //   config.jwt_refresh_secret as string,
    //   config.jwt_refresh_expires_in as string,
    // );

    return {
        accessToken,
        user
        //   refreshToken,
    };
};

const forgetPassword = async (userEmail: string) => {

    const user = await User.isUserExistsByEmail(userEmail)

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist !');
    }

    const jwtPayload = {
        userId: user,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_secret as string,
        '10m',
    );

    const resetUILink = `http://localhost:3000?email=${user.email}&token=${accessToken}`
    console.log(resetUILink);

};

const getUserFromDB = async (payload: TUser) => {
    const user = await User.findOne({ _id: payload })
    return user
};


export const UserServices = {
    createUserIntoDB,
    login,
    forgetPassword,
    getUserFromDB
}