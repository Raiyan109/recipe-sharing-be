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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const follow_service_1 = require("./follow.service");
const followUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const followerId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId) === null || _b === void 0 ? void 0 : _b._id;
    const { followeeId } = req.params;
    const result = yield follow_service_1.FollowServices.followUser(followerId, followeeId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User Followed successfully',
        data: result,
    });
}));
const unFollowUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const followerId = (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId) === null || _d === void 0 ? void 0 : _d._id;
    const { followeeId } = req.params;
    const result = yield follow_service_1.FollowServices.unFollowUser(followerId, followeeId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User Un-followed successfully',
        data: result,
    });
}));
const getFollowers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const result = yield follow_service_1.FollowServices.getFollowers(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Followers list retrieved successfully',
        data: result,
    });
}));
exports.FollowControllers = {
    followUser,
    unFollowUser,
    getFollowers
};
