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

export const FollowServices = {
    followUser
}