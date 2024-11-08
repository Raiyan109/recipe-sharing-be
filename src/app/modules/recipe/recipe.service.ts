import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IReview, TRecipe } from "./recipe.interface";
import { RecipeModel } from "./recipe.model";
import { Types } from "mongoose";

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
    const result = await RecipeModel.aggregate([
        {
            $addFields: {
                voteCount: { $size: "$votes" } // Adds a field with the count of votes
            }
        },
        { $sort: { voteCount: -1 } }, // Sort by vote count in descending order
        { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
        { $unwind: '$user' },
        // {
        //     $lookup: {
        //         from: 'users',
        //         localField: 'reviews.user',
        //         foreignField: '_id',
        //         as: 'reviews.user'
        //     }
        // }
    ]);

    return result;
};

const getLatestRecipesFromDB = async () => {
    const result = await RecipeModel.find().sort({ createdAt: -1 })

    return result;
};

const getSingleRecipeFromDB = async (id: string) => {
    const result = await RecipeModel.findById(id).populate('user')
    return result
}

const getRecipesByUserFromDB = async (userId: string, query: string = '', page: number = 1, limit: number = 10) => {

    const searchFilter = query
        ? {
            user: new Types.ObjectId(userId), // Filter by user ID
            $or: [
                { title: { $regex: query, $options: 'i' } }, // Case-insensitive title search
                { desc: { $regex: query, $options: 'i' } }    // Case-insensitive description search
            ]
        } : {
            user: new Types.ObjectId(userId)
        }

    // Calculate pagination values
    const skip = (page - 1) * limit;

    const result = await RecipeModel.find(searchFilter)
        .skip(skip)
        .limit(limit)
        .populate('user')

    // Get total count for pagination purposes
    const totalRecipes = await RecipeModel.countDocuments(searchFilter);

    return { result, totalRecipes };
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

const deleteReviewFromRecipe = async (reviewId: string, recipeId: string) => {
    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
        recipeId,
        { $pull: { reviews: { _id: reviewId } } },
        { new: true }
    );

    if (!updatedRecipe) {
        throw new AppError(httpStatus.NOT_FOUND, "Recipe or review not found");
    }

    return updatedRecipe
};

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
    addDownvoteIntoRecipe,
    deleteReviewFromRecipe,
    getLatestRecipesFromDB
}