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
exports.PaymentServices = void 0;
const user_model_1 = require("../user/user.model");
const payment_model_1 = require("./payment.model");
const payment_utils_1 = require("./payment.utils");
const path_1 = require("path");
const fs_1 = require("fs");
const createPaymentIntoDB = (user, payableAmount, recipe) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = `TXN-${Date.now()}`;
    const result = yield payment_model_1.PaymentModel.create({
        user,
        payableAmount,
        recipe: recipe || "General Subscription",
        status: 'Pending',
        paymentStatus: 'Pending',
        transactionId
    });
    const userInfo = yield user_model_1.User.findById(user);
    // payment 
    let paymentData;
    if (userInfo) {
        paymentData = {
            transactionId,
            payableAmount,
            customerName: userInfo.name,
            customerEmail: userInfo.email,
            customerPhone: userInfo.phone,
            customerAddress: userInfo.address,
        };
    }
    const paymentSession = yield (0, payment_utils_1.initialPayment)(paymentData);
    return {
        payment: result,
        paymentSession
    };
});
const confirmationService = (transactionId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyResponse = yield (0, payment_utils_1.verifyPayment)(transactionId);
    let result;
    let message = "";
    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        result = yield payment_model_1.PaymentModel.findOneAndUpdate({ transactionId }, {
            paymentStatus: 'Paid'
        });
        const payment = yield payment_model_1.PaymentModel.findOne({ transactionId });
        if (payment) {
            // Update user's membership to "premium"
            yield user_model_1.User.findByIdAndUpdate(payment.user, { membership: 'premium' });
            message = "Membership upgraded to premium successfully!";
        }
        else {
            message = "Payment record not found!";
        }
    }
    else {
        message = "Payment Failed!";
    }
    const filePath = (0, path_1.join)(__dirname, '../../../../public/confirmation.html');
    let template = (0, fs_1.readFileSync)(filePath, 'utf-8');
    template = template.replace('{{message}}', message);
    return template;
});
exports.PaymentServices = {
    createPaymentIntoDB,
    confirmationService
};
