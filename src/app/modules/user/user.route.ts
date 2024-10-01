import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post(
    '/signup',
    // validateRequest(UserValidations.userValidationSchema),
    UserControllers.signUp,
);

router.post(
    '/login',
    // validateRequest(UserValidations.loginValidationSchema),
    UserControllers.loginUser,
);

router.post(
    '/forget-password',
    // validateRequest(AuthValidation.forgetPasswordValidationSchema),
    UserControllers.forgetPassword,
);

router.get('/user', auth('user', 'admin'), UserControllers.getUser)

export const UserRoutes = router;