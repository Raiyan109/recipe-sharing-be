import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

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

export const UserControllers = {
    signUp,
    loginUser,
}