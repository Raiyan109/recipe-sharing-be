import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { RecipeControllers } from './recipe.controller';


const router = express.Router();


router.put(
    '/:recipeId/upvote',
    auth('user', 'admin'),
    RecipeControllers.upvote,
);

router.put(
    '/:recipeId/downvote',
    auth('user', 'admin'),
    RecipeControllers.downvote,
);

router.post(
    '/',
    // auth('admin'),
    RecipeControllers.createRecipe,
);

router.post(
    '/:recipeId/review',
    auth('user', 'admin'),
    RecipeControllers.addReview,
);

router.get(
    '/categories',
    RecipeControllers.getAllCategories,
);

router.get(
    '/user',
    auth('user'),
    RecipeControllers.getRecipesByUser,
);

router.delete('/:id', auth('user', 'admin'), RecipeControllers.deleteRecipe);

router.delete("/:recipeId/review/:reviewId", auth('user', 'admin'), RecipeControllers.deleteReview);

router.get(
    '/latest',
    // auth('user', 'admin'),
    RecipeControllers.getLatestRecipes,
);

router.get(
    '/:id',
    // auth('user', 'admin'),
    RecipeControllers.getSingleRecipe,
);



router.get(
    '/',
    // auth('user', 'admin'),
    RecipeControllers.getAllRecipes,
);







export const RecipeRoutes = router;