import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IReview, TRecipe } from "./recipe.interface";
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

const getAllCategoriesFromDB = async (): Promise<CategoryItem[]> => {
    const result: CategoryItem[] = await RecipeModel.find({}, { category: 1, image: 1, title: 1, _id: 1 });

    const uniqueCategories: CategoryItem[] = [];
    const categorySet = new Set<string>();


    result.forEach(item => {
        const category = item.category[0]; // Extract the single category string from the array
        if (!categorySet.has(category)) {
            categorySet.add(category);
            uniqueCategories.push(item);
        }
    });

    return uniqueCategories;
};


const getAllRecipesFromDB = async () => {
    const result = await RecipeModel.find().populate('user').populate({
        path: 'reviews.user',
        select: 'name photo _id',
    })

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

const deleteRecipeFromDB = async (id: string) => {
    const result = await RecipeModel.findByIdAndDelete(
        id,
        {
            new: true,
        },
    );
    return result;
};

const addReviewIntoRecipe = async (recipeId: string, userId: string, payload: IReview) => {
    const recipe = await RecipeModel.findById(recipeId)

    if (!recipe) {
        throw new AppError(httpStatus.FORBIDDEN, 'This recipe does not exists!');
    }

    const reviewData = {
        user: userId,
        rating: payload.rating,
        comment: payload.comment,
    };

    // Push the review into the `reviews` array
    recipe.reviews?.push(reviewData);

    // Save the updated recipe
    const result = await recipe.save();  // Use save to update the existing document

    return result;
}

const addUpvoteIntoRecipe = async (userId: string, recipeId: string) => {
    const upvote = await RecipeModel.findByIdAndUpdate(recipeId, {
        $push: {
            votes: userId
        }
    }, {
        new: true
    })
    return upvote
}

const addDownvoteIntoRecipe = async (userId: string, recipeId: string) => {
    const downvote = await RecipeModel.findByIdAndUpdate(recipeId, {
        $pull: {
            votes: userId
        }
    }, {
        new: true
    })
    return downvote
}

export const RecipeServices = {
    createRecipeIntoDB,
    getAllRecipesFromDB,
    getSingleRecipeFromDB,
    getRecipesByUserFromDB,
    getAllCategoriesFromDB,
    deleteRecipeFromDB,
    addReviewIntoRecipe,
    addUpvoteIntoRecipe,
    addDownvoteIntoRecipe
}