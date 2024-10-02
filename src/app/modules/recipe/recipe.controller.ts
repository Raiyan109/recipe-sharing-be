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

    const result = await RecipeServices.getRecipesByUserFromDB(userId);


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


export const RecipeControllers = {
    createRecipe,
    getAllRecipes,
    getSingleRecipe,
    getRecipesByUser
}