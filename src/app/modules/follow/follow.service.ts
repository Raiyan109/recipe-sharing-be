import { Types } from "mongoose";
import { User } from "../user/user.model";
import { FollowModel } from "./follow.model";
import { TFollow } from "./follow.interface";

const followUser = async (followerId: Types.ObjectId, followeeId: string): Promise<TFollow> => {
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

export const FollowServices = {
    followUser,
    unFollowUser
}