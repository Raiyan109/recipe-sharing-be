import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { RecipeControllers } from './recipe.controller';


const router = express.Router();

router.post(
    '/',
    // auth('admin'),
    RecipeControllers.createRecipe,
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

router.delete('/:id', auth('user'), RecipeControllers.deleteRecipe);

// router.put(
//     '/:id',
//     // auth('admin'),
//     validateRequest(FacilityValidations.updateFacilityValidationSchema),
//     FacilityControllers.updateFacility,
// );

// router.delete('/:id', auth('admin'), FacilityControllers.deleteFacility);

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