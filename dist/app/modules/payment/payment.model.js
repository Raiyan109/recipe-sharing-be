"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    payableAmount: {
        type: Number,
    },
    recipe: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.PaymentModel = (0, mongoose_1.model)('Payment', paymentSchema);
