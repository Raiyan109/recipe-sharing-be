import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentServices } from "./payment.service";

const createPayment = catchAsync(async (req, res) => {
    const user = req.user?.userId?._id
    const { recipe } = req.params;
    const { payableAmount } = req.body
    console.log(user, recipe, payableAmount, 'payableAmount');


    const result = await PaymentServices.createPaymentIntoDB(user, payableAmount, recipe);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Payment added successfully',
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
    confirmationController
}