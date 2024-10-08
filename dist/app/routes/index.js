"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const recipe_route_1 = require("../modules/recipe/recipe.route");
const follow_route_1 = require("../modules/follow/follow.route");
const payment_route_1 = require("../modules/payment/payment.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/recipe',
        route: recipe_route_1.RecipeRoutes,
    },
    {
        path: '/follow',
        route: follow_route_1.FollowRoutes,
    },
    {
        path: '/payment',
        route: payment_route_1.PaymentRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
