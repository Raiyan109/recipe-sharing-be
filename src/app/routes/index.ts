import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { RecipeRoutes } from '../modules/recipe/recipe.route';
import { FollowRoutes } from '../modules/follow/follow.route';
import { PaymentRoutes } from '../modules/payment/payment.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: UserRoutes,
    },
    {
        path: '/recipe',
        route: RecipeRoutes,
    },
    {
        path: '/follow',
        route: FollowRoutes,
    },
    {
        path: '/payment',
        route: PaymentRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;