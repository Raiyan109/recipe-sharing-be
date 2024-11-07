import { User } from "../user/user.model";
import { TPayment } from "./payment.interface"
import { PaymentModel } from "./payment.model"
import { initialPayment, verifyPayment } from "./payment.utils";
import { join } from "path";
import { readFileSync } from "fs";

const createPaymentIntoDB = async (user: string, payableAmount: number, recipe: string | null) => {
    const transactionId = `TXN-${Date.now()}`;

    const result = await PaymentModel.create({
        user,
        payableAmount,
        recipe: recipe || undefined, // Pass `undefined` if recipe is null
        type: recipe ? 'recipe' : 'general',
        status: 'Pending',
        paymentStatus: 'Pending',
        transactionId
    })

    const userInfo = await User.findById(user)

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
        }
    }
    const paymentSession = await initialPayment(paymentData)
    return {
        payment: result,
        paymentSession
    }
}

const confirmationService = async (transactionId: string, status: string) => {
    const verifyResponse = await verifyPayment(transactionId);

    let result;
    let message = "";

    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        result = await PaymentModel.findOneAndUpdate({ transactionId }, {
            paymentStatus: 'Paid'
        });
        const payment = await PaymentModel.findOne({ transactionId });

        if (payment) {
            // Update user's membership to "premium"
            await User.findByIdAndUpdate(payment.user, { membership: 'premium' });
            message = "Membership upgraded to premium successfully!";
        } else {
            message = "Payment record not found!";
        }
    }
    else {
        message = "Payment Failed!"
    }

    const filePath = join(__dirname, '../../../../public/confirmation.html');
    let template = readFileSync(filePath, 'utf-8')

    template = template.replace('{{message}}', message)

    return template;
}

export const PaymentServices = {
    createPaymentIntoDB,
    confirmationService
} 