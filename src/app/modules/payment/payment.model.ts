import { Schema, model } from "mongoose";
import { TPayment } from "./payment.interface";

const paymentSchema = new Schema<TPayment>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    payableAmount: {
        type: Number,
    },
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
    },
    transactionId: {
        type: String,
        required: true
    },
}, { timestamps: true })

export const PaymentModel = model<TPayment>('Payment', paymentSchema)