import { Types } from "mongoose";

export type IReview = {
    user: string;
    rating: number;
    comment: string;
    // commentedAt: string;
    // parentComment: string;
    // replies: string;
}

export type TRecipe = {
    title: string;
    desc: string;
    image: string;
    reviews?: [IReview],
    contentAvailability: 'free' | 'premium'
    user: Types.ObjectId;
    category: [string];
    votes: [string],
    ingredients: [string],
} 