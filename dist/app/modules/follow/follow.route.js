"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const follow_controller_1 = require("./follow.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// Follow a user
router.post('/:followeeId', (0, auth_1.default)('user', 'admin'), follow_controller_1.FollowControllers.followUser);
// Unfollow a user
router.delete('/unFollow/:followeeId', (0, auth_1.default)('user', 'admin'), follow_controller_1.FollowControllers.unFollowUser);
exports.FollowRoutes = router;
