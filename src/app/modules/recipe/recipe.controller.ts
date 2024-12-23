import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RecipeServices } from "./recipe.service";

const createRecipe = catchAsync(async (req, res) => {

    const result = await RecipeServices.createRecipeIntoDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Recipe added successfully',
        data: result,
    });
});

const getAllCategories = catchAsync(async (req, res) => {
    const result = await RecipeServices.getAllCategoriesFromDB();

    // Check if the database collection is empty or no matching data is found
    if (!result || result.length === 0) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: 'No data found.',
            data: [],
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Categories retrieved successfully',
        data: result,
    });
});

const getAllRecipes = catchAsync(async (req, res) => {
    const result = await RecipeServices.getAllRecipesFromDB();

    // Check if the database collection is empty or no matching data is found
    if (!result || result.length === 0) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: 'No data found.',
            data: [],
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Recipes retrieved successfully',
        data: result,
    });
});

const getLatestRecipes = catchAsync(async (req, res) => {
    const result = await RecipeServices.getLatestRecipesFromDB();

    // Check if the database collection is empty or no matching data is found
    if (!result || result.length === 0) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: 'No data found.',
            data: [],
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Recipes retrieved successfully',
        data: result,
    });
});

const getSingleRecipe = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await RecipeServices.getSingleRecipeFromDB(id)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Single Recipe retrieved successfully',
        data: result,
    });
})

const getRecipesByUser = catchAsync(async (req, res) => {
    const userId = req.user?.userId?._id
    const { query = "", page = "1", limit = "10" } = req.query;

    const result = await RecipeServices.getRecipesByUserFromDB(userId, query as string, parseInt(page as string), parseInt(limit as string));


    // Check if the database collection is empty or no matching data is found

    if (!result.result || result.result.length === 0) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: 'No data found.',
            data: [],
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Recipes retrieved successfully',
        data: result.result,
        meta: {
            total: result.totalRecipes,
            currentPage: Number(page),
            totalPages: Math.ceil(result.totalRecipes / Number(limit)),
        },
    });
});

const deleteRecipe = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await RecipeServices.deleteRecipeFromDB(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Recipe deleted successfully',
        data: result,
    });
});

const addReview = catchAsync(async (req, res) => {
    const userId = req.user?.userId?._id
    const { recipeId } = req.params;


    const result = await RecipeServices.addReviewIntoRecipe(recipeId, userId, req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Review added successfully',
        data: result,
    });
})

const deleteReview = catchAsync(async (req, res) => {
    const { reviewId, recipeId } = req.params;
    const result = await RecipeServices.deleteReviewFromRecipe(reviewId, recipeId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Review deleted successfully',
        data: result,
    });
});

const upvote = catchAsync(async (req, res) => {
    const userId = req.user?.userId?._id
    const { recipeId } = req.params;

    const result = await RecipeServices.addUpvoteIntoRecipe(userId, recipeId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Upvote added successfully',
        data: result,
    });
})

const downvote = catchAsync(async (req, res) => {
    const userId = req.user?.userId?._id
    const { recipeId } = req.params;
    const result = await RecipeServices.addDownvoteIntoRecipe(userId, recipeId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Downvote added successfully',
        data: result,
    });
})


export const RecipeControllers = {
    createRecipe,
    getAllRecipes,
    getSingleRecipe,
    getRecipesByUser,
    getAllCategories,
    deleteRecipe,
    addReview,
    deleteReview,
    upvote,
    downvote,
    getLatestRecipes
}