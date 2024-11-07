"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const payment_controller_1 = require("./payment.controller");
const router = express_1.default.Router();
router.post('/confirmation', payment_controller_1.PaymentControllers.confirmationController);
router.post('/:recipe', (0, auth_1.default)('admin', 'user'), payment_controller_1.PaymentControllers.createPayment);
// In PaymentRoutes file
router.post('/general-subscription', // New route for general subscriptions
(0, auth_1.default)('admin', 'user'), payment_controller_1.PaymentControllers.createGeneralSubscriptionPayment);
exports.PaymentRoutes = router;
