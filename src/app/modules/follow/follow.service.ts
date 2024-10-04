import { Types } from "mongoose";
import { User } from "../user/user.model";
import { FollowModel } from "./follow.model";
import { TFollow } from "./follow.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const followUser = async (followerId: Types.ObjectId, followeeId: string): Promise<TFollow> => {
    // Check if the follow relationship already exists
    const existingFollow = await FollowModel.findOne({ follower: followerId, followee: followeeId });

    if (existingFollow) {
        // Prevent the user from following the same user multiple times
        throw new AppError(httpStatus.CONFLICT, 'You are already following this user.');
    }

    const follow = new FollowModel({
        follower: followerId,
        followee: followeeId,
    });
    await follow.save();

    await User.findByIdAndUpdate(followerId, { $push: { following: followeeId } });
    await User.findByIdAndUpdate(followeeId, { $push: { followers: followerId } });

    return follow;
};

const unFollowUser = async (followerId: Types.ObjectId, followeeId: string): Promise<void> => {
    await FollowModel.deleteOne({ follower: followerId, followee: followeeId });

    await User.findByIdAndUpdate(followerId, { $pull: { following: followeeId } });
    await User.findByIdAndUpdate(followeeId, { $pull: { followers: followerId } });
};

const getFollowers = async (userId: string) => {
    const followers = await FollowModel.find({ followee: userId }).populate('follower');
    return followers.map((follow) => follow.follower);
};

/**
 * Get list of following users for a user
 */
const getFollowing = async (userId: string) => {
    const following = await FollowModel.find({ follower: userId }).populate('followee');
    return following.map((follow) => follow.followee);
};

export const FollowServices = {
    followUser,
    unFollowUser,
    getFollowers,
    getFollowing
}