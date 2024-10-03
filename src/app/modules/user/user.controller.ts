import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import AppError from "../../errors/AppError";

const signUp = catchAsync(async (req, res) => {
    const result = await UserServices.createUserIntoDB(req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User registered successfully',
        data: result,
    });
})

const loginUser = catchAsync(async (req, res) => {
    const result = await UserServices.login(req.body);
    const { accessToken, user } = result;


    // res.cookie('refreshToken', refreshToken, {
    //   secure: config.NODE_ENV === 'production',
    //   httpOnly: true,
    // });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User logged in successfully',
        token: accessToken,
        data: user,
    });
});

const forgetPassword = catchAsync(async (req, res) => {
    const userEmail = req.body.email;
    const result = await UserServices.forgetPassword(userEmail);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Reset link is generated successfully!',
        data: result,
    });
});
const resetPassword = catchAsync(async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        throw new AppError(httpStatus.NOT_FOUND, 'Token does not exist !');
    }

    const result = await UserServices.resetPassword(req.body, token);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password reset successfully!',
        data: result,
    });
});

const getUser = catchAsync(async (req, res) => {
    const userId = req.user?.userId?._id
    const result = await UserServices.getUserFromDB(userId)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User retrieved successfully',
        data: result,
    });
})

const getAllUsers = catchAsync(async (req, res) => {
    const result = await UserServices.getAllUsersFromDB()

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Users retrieved successfully',
        data: result,
    });
})

const updateUserIsBlocked = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserServices.updateUserIsBlockedIntoDB(id, req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User block status updated successfully',
        data: result,
    });
});

const updateProfile = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserServices.updateProfileIntoDB(id, req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Profile updated successfully',
        data: result,
    });
});


export const UserControllers = {
    signUp,
    loginUser,
    forgetPassword,
    getUser,
    resetPassword,
    getAllUsers,
    updateUserIsBlocked,
    updateProfile
}