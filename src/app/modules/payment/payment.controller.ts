import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentServices } from "./payment.service";

const createPayment = catchAsync(async (req, res) => {
    const user = req.user?.userId?._id
    const { recipe } = req.params;
    const { payableAmount } = req.body

    const result = await PaymentServices.createPaymentIntoDB(user, payableAmount, recipe);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Payment added successfully',
        data: result,
    });
});

const createGeneralSubscriptionPayment = catchAsync(async (req, res) => {
    const user = req.user?.userId?._id;
    const { payableAmount } = req.body;

    // Call createPaymentIntoDB without `recipe` for general subscriptions
    const result = await PaymentServices.createPaymentIntoDB(user, payableAmount, null);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Subscription payment initiated successfully',
        data: result,
    });
});


const confirmationController = catchAsync(async (req, res) => {
    const { transactionId, status } = req.query;

    const result = await PaymentServices.confirmationService(transactionId as string, status as string);
    res.send(result)
});


export const PaymentControllers = {
    createPayment,
    confirmationController,
    createGeneralSubscriptionPayment
}