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
    reviews: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            rating: {
                type: Number
            },
            comment: {
                type: String
            },
            // commentedAt: {
            //     type: Date,
            //     default: Date.now()
            // },
            // parentComment: {
            //     type: String
            // },
            // replies: {
            //     type: String
            // },
        }
    ],
    contentAvailability: {
        type: String,
        enum: ['free', 'premium'],
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    category: {
        type: [String],
        required: true
    },
    votes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
}, { timestamps: true })

export const RecipeModel = model<TRecipe>('Recipe', recipeSchema)