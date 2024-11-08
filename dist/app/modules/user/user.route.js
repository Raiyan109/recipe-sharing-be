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
router.get('/user', (0, auth_1.default)('user', 'admin'), user_controller_1.UserControllers.getUser);
router.get('/growth', (0, auth_1.default)('admin'), user_controller_1.UserControllers.getUserGrowth);
router.put('/:id', (0, auth_1.default)('admin'), user_controller_1.UserControllers.updateUserIsBlocked);
router.put('/updateProfile/:id', (0, auth_1.default)('admin', 'user'), user_controller_1.UserControllers.updateProfile);
router.get('/:id', (0, auth_1.default)('user', 'admin'), user_controller_1.UserControllers.getSingleUser);
router.delete('/:id', (0, auth_1.default)('admin'), user_controller_1.UserControllers.deleteUser);
router.post('/signup', 
// validateRequest(UserValidations.userValidationSchema),
user_controller_1.UserControllers.signUp);
router.post('/login', 
// validateRequest(UserValidations.loginValidationSchema),
user_controller_1.UserControllers.loginUser);
router.post('/forget-password', 
// validateRequest(AuthValidation.forgetPasswordValidationSchema),
user_controller_1.UserControllers.forgetPassword);
router.post('/reset-password', 
// validateRequest(AuthValidation.forgetPasswordValidationSchema),
user_controller_1.UserControllers.resetPassword);
router.get('/', (0, auth_1.default)('user', 'admin'), user_controller_1.UserControllers.getAllUsers);
exports.UserRoutes = router;
