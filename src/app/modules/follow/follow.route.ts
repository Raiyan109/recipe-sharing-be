import express from 'express';
import { FollowControllers } from './follow.controller';
import auth from '../../middlewares/auth';


const router = express.Router();

// Follow a user
router.post('/:followeeId', auth('user', 'admin'), FollowControllers.followUser);

// Unfollow a user
router.delete('/unFollow/:followeeId', auth('user', 'admin'), FollowControllers.unFollowUser);

export const FollowRoutes = router;