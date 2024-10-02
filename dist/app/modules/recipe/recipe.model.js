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
    rating: {
        type: String,
        required: true
    },
    contentAvailability: {
        type: String,
        enum: ['free', 'premium'],
        required: true
    }
}, { timestamps: true });
exports.RecipeModel = (0, mongoose_1.model)('Recipe', recipeSchema);