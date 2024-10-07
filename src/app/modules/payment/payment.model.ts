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
    }
}, { timestamps: true })

export const PaymentModel = model<TPayment>('Payment', paymentSchema)