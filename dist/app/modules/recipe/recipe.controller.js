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
exports.RecipeControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const recipe_service_1 = require("./recipe.service");
const createRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_service_1.RecipeServices.createRecipeIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Recipe added successfully',
        data: result,
    });
}));
const getAllCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_service_1.RecipeServices.getAllCategoriesFromDB();
    // Check if the database collection is empty or no matching data is found
    if (!result || result.length === 0) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: 'No data found.',
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Categories retrieved successfully',
        data: result,
    });
}));
const getAllRecipes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_service_1.RecipeServices.getAllRecipesFromDB();
    // Check if the database collection is empty or no matching data is found
    if (!result || result.length === 0) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: 'No data found.',
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Recipes retrieved successfully',
        data: result,
    });
}));
const getSingleRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield recipe_service_1.RecipeServices.getSingleRecipeFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Single Recipe retrieved successfully',
        data: result,
    });
}));
const getRecipesByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId) === null || _b === void 0 ? void 0 : _b._id;
    const { query = "", page = "1", limit = "2" } = req.query;
    const result = yield recipe_service_1.RecipeServices.getRecipesByUserFromDB(userId, query, parseInt(page), parseInt(limit));
    // Check if the database collection is empty or no matching data is found
    if (!result.result || result.result.length === 0) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: 'No data found.',
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Recipes retrieved successfully',
        data: result.result,
        meta: {
            total: result.totalRecipes,
            currentPage: Number(page),
            totalPages: Math.ceil(result.totalRecipes / Number(limit)),
        },
    });
}));
const deleteRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield recipe_service_1.RecipeServices.deleteRecipeFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Recipe deleted successfully',
        data: result,
    });
}));
const addReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const userId = (_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId) === null || _d === void 0 ? void 0 : _d._id;
    const { recipeId } = req.params;
    const result = yield recipe_service_1.RecipeServices.addReviewIntoRecipe(recipeId, userId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Review added successfully',
        data: result,
    });
}));
const upvote = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const userId = (_f = (_e = req.user) === null || _e === void 0 ? void 0 : _e.userId) === null || _f === void 0 ? void 0 : _f._id;
    const { recipeId } = req.params;
    const result = yield recipe_service_1.RecipeServices.addUpvoteIntoRecipe(userId, recipeId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Upvote added successfully',
        data: result,
    });
}));
const downvote = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    const userId = (_h = (_g = req.user) === null || _g === void 0 ? void 0 : _g.userId) === null || _h === void 0 ? void 0 : _h._id;
    const { recipeId } = req.params;
    const result = yield recipe_service_1.RecipeServices.addDownvoteIntoRecipe(userId, recipeId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Downvote added successfully',
        data: result,
    });
}));
exports.RecipeControllers = {
    createRecipe,
    getAllRecipes,
    getSingleRecipe,
    getRecipesByUser,
    getAllCategories,
    deleteRecipe,
    addReview,
    upvote,
    downvote
};
