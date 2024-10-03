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
    const result = yield recipe_model_1.RecipeModel.find().populate('user');
    return result;
});
const getSingleRecipeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.RecipeModel.findById(id).populate('user');
    return result;
});
const getRecipesByUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.RecipeModel.find({ user: userId }).populate('user');
    return result;
});
exports.RecipeServices = {
    createRecipeIntoDB,
    getAllRecipesFromDB,
    getSingleRecipeFromDB,
    getRecipesByUserFromDB,
    getAllCategoriesFromDB
};
