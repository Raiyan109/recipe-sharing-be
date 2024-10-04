import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FollowServices } from "./follow.service";

const followUser = catchAsync(async (req, res) => {
    const followerId = req.user?.userId?._id
    const { followeeId } = req.params;

    const result = await FollowServices.followUser(followerId, followeeId)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User Followed successfully',
        data: result,
    });
})

const unFollowUser = catchAsync(async (req, res) => {
    const followerId = req.user?.userId?._id
    const { followeeId } = req.params;

    const result = await FollowServices.unFollowUser(followerId, followeeId)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User Un-followed successfully',
        data: result,
    });
})

const getFollowers = catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log(id);

    const result = await FollowServices.getFollowers(id)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Followers list retrieved successfully',
        data: result,
    });
})

export const FollowControllers = {
    followUser,
    unFollowUser,
    getFollowers
}