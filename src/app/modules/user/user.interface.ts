import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: 'admin' | 'user';
    address: string;
    photo?: string;
    bio?: string;
    isBlocked: boolean;
    membership: 'free' | 'premium'
    following?: Types.ObjectId;
    followers?: Types.ObjectId;
    passwordChangedAt?: Date;
}

export type TLoginUser = {
    email: string;
    password: string;
};

export interface UserModel extends Model<TUser> {
    //instance methods for checking if the user exist
    isUserExistsByEmail(id: string): Promise<TUser>;
    //instance methods for checking if passwords are matched
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
    // isJWTIssuedBeforePasswordChanged(
    //   passwordChangedTimestamp: Date,
    //   jwtIssuedTimestamp: number,
    // ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;