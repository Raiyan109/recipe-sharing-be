"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const recipe_model_1 = require("./recipe.model");
const mongoose_1 = require("mongoose");
const createRecipeIntoDB = (recipe) => __awaiter(void 0, void 0, void 0, function* () {
    const isRecipeExists = yield recipe_model_1.RecipeModel.findOne({ name: recipe.title });
    if (isRecipeExists) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'This recipe is already exists!');
    }
    const result = yield recipe_model_1.RecipeModel.create(recipe);
    return result;
});
const getAllCategoriesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.RecipeModel.find({}, { category: 1, image: 1, title: 1, _id: 1 });
    const uniqueCategories = [];
    const categorySet = new Set();
    result.forEach(item => {
        const category = item.category[0]; // Extract the single category string from the array
        if (!categorySet.has(category)) {
            categorySet.add(category);
            uniqueCategories.push(item);
        }
    });
    return uniqueCategories;
});
const getAllRecipesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.RecipeModel.aggregate([
        {
            $addFields: {
                voteCount: { $size: "$votes" } // Adds a field with the count of votes
            }
        },
        { $sort: { voteCount: -1 } }, // Sort by vote count in descending order
        { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
        { $unwind: '$user' },
        {
            $lookup: {
                from: 'users',
                localField: 'reviews.user',
                foreignField: '_id',
                as: 'reviews.user'
            }
        }
    ]);
    return result;
});
const getSingleRecipeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.RecipeModel.findById(id).populate('user');
    return result;
});
const getRecipesByUserFromDB = (userId_1, ...args_1) => __awaiter(void 0, [userId_1, ...args_1], void 0, function* (userId, query = '', page = 1, limit = 2) {
    const searchFilter = query
        ? {
            user: new mongoose_1.Types.ObjectId(userId), // Filter by user ID
            $or: [
                { title: { $regex: query, $options: 'i' } }, // Case-insensitive title search
                { desc: { $regex: query, $options: 'i' } } // Case-insensitive description search
            ]
        } : {
        user: new mongoose_1.Types.ObjectId(userId)
    };
    // Calculate pagination values
    const skip = (page - 1) * limit;
    const result = yield recipe_model_1.RecipeModel.find(searchFilter)
        .skip(skip)
        .limit(limit)
        .populate('user');
    // Get total count for pagination purposes
    const totalRecipes = yield recipe_model_1.RecipeModel.countDocuments(searchFilter);
    return { result, totalRecipes };
});
const deleteRecipeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.RecipeModel.findByIdAndDelete(id, {
        new: true,
    });
    return result;
});
const addReviewIntoRecipe = (recipeId, userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const recipe = yield recipe_model_1.RecipeModel.findById(recipeId);
    if (!recipe) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This recipe does not exists!');
    }
    const reviewData = {
        user: userId,
        rating: payload.rating,
        comment: payload.comment,
    };
    // Push the review into the `reviews` array
    (_a = recipe.reviews) === null || _a === void 0 ? void 0 : _a.push(reviewData);
    // Save the updated recipe
    const result = yield recipe.save(); // Use save to update the existing document
    return result;
});
const addUpvoteIntoRecipe = (userId, recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    const upvote = yield recipe_model_1.RecipeModel.findByIdAndUpdate(recipeId, {
        $push: {
            votes: userId
        }
    }, {
        new: true
    });
    return upvote;
});
const addDownvoteIntoRecipe = (userId, recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    const downvote = yield recipe_model_1.RecipeModel.findByIdAndUpdate(recipeId, {
        $pull: {
            votes: userId
        }
    }, {
        new: true
    });
    return downvote;
});
exports.RecipeServices = {
    createRecipeIntoDB,
    getAllRecipesFromDB,
    getSingleRecipeFromDB,
    getRecipesByUserFromDB,
    getAllCategoriesFromDB,
    deleteRecipeFromDB,
    addReviewIntoRecipe,
    addUpvoteIntoRecipe,
    addDownvoteIntoRecipe
};
