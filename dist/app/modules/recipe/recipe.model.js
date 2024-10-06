"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeModel = void 0;
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    reviews: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User',
            },
            rating: {
                type: Number
            },
            comment: {
                type: String
            },
        }
    ],
    contentAvailability: {
        type: String,
        enum: ['free', 'premium'],
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    category: {
        type: [String],
        required: true
    },
    votes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
}, { timestamps: true });
exports.RecipeModel = (0, mongoose_1.model)('Recipe', recipeSchema);
