import { Types } from "mongoose";

export type TFollow = {
    // list of all of their followers
    follower: Types.ObjectId;
    // list of all whom they are following
    followee: Types.ObjectId;
} 