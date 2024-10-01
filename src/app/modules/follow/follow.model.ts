import { Schema, model } from "mongoose";
import { TFollow } from "./follow.interface";

const followSchema = new Schema<TFollow>({
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    followee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

export const FollowModel = model<TFollow>('Follow', followSchema)