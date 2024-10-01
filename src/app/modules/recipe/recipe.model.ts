import { Schema, model } from "mongoose";
import { TRecipe } from "./recipe.interface";


const recipeSchema = new Schema<TRecipe>({
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
}, { timestamps: true })

export const RecipeModel = model<TRecipe>('Recipe', recipeSchema)