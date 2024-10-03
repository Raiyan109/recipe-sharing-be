"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const recipe_controller_1 = require("./recipe.controller");
const router = express_1.default.Router();
router.post('/', 
// auth('admin'),
recipe_controller_1.RecipeControllers.createRecipe);
router.get('/categories', recipe_controller_1.RecipeControllers.getAllCategories);
router.get('/user', (0, auth_1.default)('user'), recipe_controller_1.RecipeControllers.getRecipesByUser);
// router.put(
//     '/:id',
//     // auth('admin'),
//     validateRequest(FacilityValidations.updateFacilityValidationSchema),
//     FacilityControllers.updateFacility,
// );
// router.delete('/:id', auth('admin'), FacilityControllers.deleteFacility);
router.get('/:id', 
// auth('user', 'admin'),
recipe_controller_1.RecipeControllers.getSingleRecipe);
router.get('/', 
// auth('user', 'admin'),
recipe_controller_1.RecipeControllers.getAllRecipes);
exports.RecipeRoutes = router;
