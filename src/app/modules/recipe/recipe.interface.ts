import { Types } from "mongoose";

export type TRecipe = {
    title: string;
    desc: string;
    image: string;
    rating: string;
    contentAvailability: 'free' | 'premium'
    user: Types.ObjectId;
    category: [string];
} 