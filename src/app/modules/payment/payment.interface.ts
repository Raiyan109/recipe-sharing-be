import { Types } from "mongoose";

export type TPayment = {
    user: Types.ObjectId;
    payableAmount: number;
    recipe: Types.ObjectId;
    type:string;
    status: string;
    paymentStatus: string;
    transactionId: string;
} 