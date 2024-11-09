import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginUser, TUser, TUserQuery } from "./user.interface";
import { User } from './user.model'
import { createToken } from "./user.utils";
import config from "../../config";
import { sendEmail } from "../../utils/sendEmail";
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt'

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

    const userIsBlocked = user.isBlocked

    if (userIsBlocked === true) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
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
    try {
        const user = await User.isUserExistsByEmail(userEmail)

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist !');
        }

        const jwtPayload = {
            userId: user,
            role: user.role,
        };

        const resetToken = createToken(
            jwtPayload,
            config.jwt_secret as string,
            '10m',
        );

        // const resetUILink = `${config.reset_pass_ui_link}?email=${user.email}&token=${resetToken}`

        const resetUILink = `${config.reset_pass_ui_link}/reset-password?email=${user.email}&token=${resetToken}`
        console.log(resetUILink, 'resetUILink', user.email, 'use email');


        sendEmail(user.email, resetUILink)
    } catch (error) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to send reset link');
    }

};


const resetPassword = async (payload: { email: string, newPassword: string }, token: string) => {
    try {
        const user = await User.isUserExistsByEmail(payload.email)

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist !');
        }

        const decoded = jwt.verify(
            token,
            config.jwt_secret as string,
        ) as JwtPayload;

        console.log(decoded, 'from resetPassword');


        if (payload.email !== decoded.userId.email) {
            throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden')
        }

        // Hash new password
        const saltRounds = 10
        const newHashedPassword = await bcrypt.hash(
            payload.newPassword, saltRounds
        );

        await User.findOneAndUpdate({
            email: decoded.userId.email,
            role: decoded.userId.role
        }, {
            password: newHashedPassword,
            passwordChangedAt: new Date()
        })

        console.log(decoded, 'decoded from user.service reset');
    } catch (error) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to reset password');
    }


};

const getUserFromDB = async (payload: TUser) => {
    const user = await User.findOne({ _id: payload })
    return user
};

const getAllUsersFromDB = async (query: TUserQuery) => {

    const { role, membership, sortBy } = query;

    // Build the filter object based on query parameters
    const filter: any = {};
    if (role) filter.role = role;
    if (membership) filter.membership = membership;

    // Sort users if sortBy is provided, default to sorting by creation date
    const sortOptions: any = {};
    if (sortBy) {
        const [key, order] = sortBy.split(':');
        sortOptions[key] = order === 'desc' ? -1 : 1;
    } else {
        sortOptions.createdAt = -1; // Default sort by created date descending
    }


    const user = await User.find(filter).sort(sortOptions)
    return user
};

const getSingleUserFromDB = async (id: string) => {
    const result = await User.findById(id).select('-role -membership -password')
    return result
}

const getUserGrowthFromDB = async () => {
    // Aggregate users by month and count them
    const growthData = await User.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                userCount: { $sum: 1 },
            },
        },
        {
            $sort: { "_id.year": 1, "_id.month": 1 },
        },
    ]);
    console.log(growthData);


    return growthData.map(data => ({
        date: `${data._id.year}-${String(data._id.month).padStart(2, '0')}-01`,
        users: data.userCount,
    }));
};

const updateUserIsBlockedIntoDB = async (id: string, payload: Partial<TUser>) => {
    try {
        const isBlockedStatus = await User.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        })

        if (!isBlockedStatus) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update user block status');
        }

        return isBlockedStatus
    } catch (error) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update user block status');
    }
};

const updateProfileIntoDB = async (id: string, payload: Partial<TUser>) => {
    const { name, email, bio, password, phone, address, photo } = payload

    let updateData: Partial<TUser> = {
        name,
        email,
        bio,
        phone,
        address,
        photo,
    };

    // Only hash and update password if it's provided
    if (password) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        updateData.password = passwordHash;
    }

    try {
        const updatedProfile = await User.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        })

        if (!updatedProfile) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update profile');
        }

        return updatedProfile
    } catch (error) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update profile');
    }
};

const deleteUserFromDB = async (id: string) => {
    const result = await User.findByIdAndDelete(
        id,
        {
            new: true,
        },
    );
    return result;
};


export const UserServices = {
    createUserIntoDB,
    login,
    forgetPassword,
    getUserFromDB,
    resetPassword,
    getAllUsersFromDB,
    updateUserIsBlockedIntoDB,
    updateProfileIntoDB,
    getSingleUserFromDB,
    deleteUserFromDB,
    getUserGrowthFromDB
}