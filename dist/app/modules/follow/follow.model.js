"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowModel = void 0;
const mongoose_1 = require("mongoose");
const followSchema = new mongoose_1.Schema({
    follower: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    followee: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });
exports.FollowModel = (0, mongoose_1.model)('Follow', followSchema);
