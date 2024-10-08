import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';


const router = express.Router();

router.get('/user', auth('user', 'admin'), UserControllers.getUser)

router.put(
    '/:id',
    auth('admin'),
    UserControllers.updateUserIsBlocked,
);

router.put(
    '/updateProfile/:id',
    auth('admin', 'user'),
    UserControllers.updateProfile,
);

router.get(
    '/:id',
    auth('user', 'admin'),
    UserControllers.getSingleUser,
);

router.delete('/:id', auth('admin'), UserControllers.deleteUser);

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

router.post(
    '/reset-password',
    // validateRequest(AuthValidation.forgetPasswordValidationSchema),
    UserControllers.resetPassword,
);



router.get('/', auth('user', 'admin'), UserControllers.getAllUsers)

export const UserRoutes = router;