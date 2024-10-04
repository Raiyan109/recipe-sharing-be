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

export const FollowControllers = {
    followUser
}