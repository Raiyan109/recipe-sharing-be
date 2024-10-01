"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/signup', 
// validateRequest(UserValidations.userValidationSchema),
user_controller_1.UserControllers.signUp);
router.post('/login', 
// validateRequest(UserValidations.loginValidationSchema),
user_controller_1.UserControllers.loginUser);
router.post('/forget-password', 
// validateRequest(AuthValidation.forgetPasswordValidationSchema),
user_controller_1.UserControllers.forgetPassword);
router.get('/user', (0, auth_1.default)('user', 'admin'), user_controller_1.UserControllers.getUser);
exports.UserRoutes = router;
