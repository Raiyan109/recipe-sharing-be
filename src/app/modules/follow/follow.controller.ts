import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FollowServices } from "./follow.service";

const followUser = catchAsync(async (req, res) => {
    const followerId = req.user?.userId?._id
    const { followeeId } = req.params;
    console.log(followerId, 'follower id from controller');
    console.log(followeeId, 'followee id from controller');


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

// Get the list of users that a user is following
const getFollowing = catchAsync(async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const result = await FollowServices.getFollowing(id)

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Following list retrieved successfully',
            data: result,
        });
    } catch (error) {
        sendResponse(res, {
            success: false,
            statusCode: httpStatus.CONFLICT,
            message: 'Something went wrong while getting following list',
        });
    }
})

export const FollowControllers = {
    followUser,
    unFollowUser,
    getFollowers,
    getFollowing
}