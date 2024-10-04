import express from 'express';
import { FollowControllers } from './follow.controller';
import auth from '../../middlewares/auth';


const router = express.Router();

// Follow a user
router.post('/:followeeId', auth('user', 'admin'), FollowControllers.followUser);

// Unfollow a user
router.delete('/unFollow/:followeeId', auth('user', 'admin'), FollowControllers.unFollowUser);

// Get a list of followers of a user
router.get('/:id/followers', FollowControllers.getFollowers);

export const FollowRoutes = router;