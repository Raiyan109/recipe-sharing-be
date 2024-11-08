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
exports.PaymentControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const payment_service_1 = require("./payment.service");
const createPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId) === null || _b === void 0 ? void 0 : _b._id;
    const { recipe } = req.params;
    const { payableAmount } = req.body;
    const result = yield payment_service_1.PaymentServices.createPaymentIntoDB(user, payableAmount, recipe);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Payment added successfully',
        data: result,
    });
}));
const createGeneralSubscriptionPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const user = (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId) === null || _d === void 0 ? void 0 : _d._id;
    const { payableAmount } = req.body;
    // Call createPaymentIntoDB without `recipe` for general subscriptions
    const result = yield payment_service_1.PaymentServices.createPaymentIntoDB(user, payableAmount, null);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Subscription payment initiated successfully',
        data: result,
    });
}));
const confirmationController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId, status } = req.query;
    const result = yield payment_service_1.PaymentServices.confirmationService(transactionId, status);
    res.send(result);
}));
exports.PaymentControllers = {
    createPayment,
    confirmationController,
    createGeneralSubscriptionPayment
};
