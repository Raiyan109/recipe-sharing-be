import express from 'express';
import auth from '../../middlewares/auth';
import { PaymentControllers } from './payment.controller';

const router = express.Router();

router.post(
    '/:recipe',
    auth('admin', 'user'),
    PaymentControllers.createPayment,
);

router.post('/confirmation', PaymentControllers.confirmationController)


export const PaymentRoutes = router;