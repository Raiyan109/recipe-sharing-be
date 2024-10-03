import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TRecipe } from "./recipe.interface";
import { RecipeModel } from "./recipe.model";

type CategoryItem = {
    _id: string;
    image: string;
    title: string;
    category: string[];
};

const createRecipeIntoDB = async (recipe: TRecipe) => {
    const isRecipeExists = await RecipeModel.findOne({ name: recipe.title })
    if (isRecipeExists) {
        throw new AppError(httpStatus.CONFLICT, 'This recipe is already exists!');
    }
    const result = await RecipeModel.create(recipe)
    return result
}

const getAllRecipesFromDB = async () => {
    const result = await RecipeModel.find().populate('user')
    return result;
};

const getSingleRecipeFromDB = async (id: string) => {
    const result = await RecipeModel.findById(id).populate('user')
    return result
}

const getRecipesByUserFromDB = async (userId: string) => {

    const result = await RecipeModel.find({ user: userId }).populate('user')
    return result;
};

export const RecipeServices = {
    createRecipeIntoDB,
    getAllRecipesFromDB,
    getSingleRecipeFromDB,
    getRecipesByUserFromDB
}