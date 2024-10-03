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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const config_1 = __importDefault(require("../../config"));
const sendEmail_1 = require("../../utils/sendEmail");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield user_model_1.User.create(payload);
        return user;
    }
    catch (error) {
        console.log(error);
    }
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByEmail(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user does not exist !');
    }
    const userIsBlocked = user.isBlocked;
    if (userIsBlocked === true) {
        console.log('this user is blocked');
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked ! !');
    }
    //checking if the password is correct
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password do not matched');
    //create token and sent to the  client
    const jwtPayload = {
        userId: user,
        role: user.role,
    };
    const accessToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwt_secret, config_1.default.jwt_secret_expires_in);
    // const refreshToken = createToken(
    //   jwtPayload,
    //   config.jwt_refresh_secret as string,
    //   config.jwt_refresh_expires_in as string,
    // );
    return {
        accessToken,
        user
        //   refreshToken,
    };
});
const forgetPassword = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistsByEmail(userEmail);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user does not exist !');
    }
    const jwtPayload = {
        userId: user,
        role: user.role,
    };
    const resetToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwt_secret, '10m');
    const resetUILink = `${config_1.default.reset_pass_ui_link}?email=${user.email}&token=${resetToken}`;
    console.log(resetUILink);
    (0, sendEmail_1.sendEmail)(user.email, resetUILink);
});
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistsByEmail(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user does not exist !');
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
    if (payload.email !== decoded.userId.email) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are forbidden');
    }
    // Hash new password
    const saltRounds = 10;
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, saltRounds);
    yield user_model_1.User.findOneAndUpdate({
        email: decoded.userId.email,
        role: decoded.userId.role
    }, {
        password: newHashedPassword,
        passwordChangedAt: new Date()
    });
    console.log(decoded);
});
const getUserFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ _id: payload });
    return user;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.find();
    return user;
});
const updateUserIsBlockedIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isBlockedStatus = yield user_model_1.User.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });
        if (!isBlockedStatus) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update user block status');
        }
        return isBlockedStatus;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update user block status');
    }
});
exports.UserServices = {
    createUserIntoDB,
    login,
    forgetPassword,
    getUserFromDB,
    resetPassword,
    getAllUsersFromDB,
    updateUserIsBlockedIntoDB
};
