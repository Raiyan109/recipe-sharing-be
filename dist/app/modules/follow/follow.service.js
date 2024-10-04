"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowServices = void 0;
const user_model_1 = require("../user/user.model");
const follow_model_1 = require("./follow.model");
const followUser = (followerId, followeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const follow = new follow_model_1.FollowModel({
        follower: followerId,
        followee: followeeId,
    });
    yield follow.save();
    yield user_model_1.User.findByIdAndUpdate(followerId, { $push: { following: followeeId } });
    yield user_model_1.User.findByIdAndUpdate(followeeId, { $push: { followers: followerId } });
    return follow;
});
const unFollowUser = (followerId, followeeId) => __awaiter(void 0, void 0, void 0, function* () {
    yield follow_model_1.FollowModel.deleteOne({ follower: followerId, followee: followeeId });
    yield user_model_1.User.findByIdAndUpdate(followerId, { $pull: { following: followeeId } });
    yield user_model_1.User.findByIdAndUpdate(followeeId, { $pull: { followers: followerId } });
});
exports.FollowServices = {
    followUser,
    unFollowUser
};
