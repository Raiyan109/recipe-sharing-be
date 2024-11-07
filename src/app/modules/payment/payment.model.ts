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
        required: function () { return this.type === 'recipe'; }, // Only required for recipe payments
    },
    type: {
        type: String,
        enum: ['general', 'recipe'], // Distinguish payment type
        default: 'general',
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