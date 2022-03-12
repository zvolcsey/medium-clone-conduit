import express from 'express';
import * as profileControllers from '../../controller/profiles.controller';
import { authRequired, authOptional } from '../../middleware/middlewares';

const profilesRoutes = express.Router();

// desc    Get the profile
// route   GET /api/profiles/:username
profilesRoutes.get(
  '/:username',
  authOptional,
  profileControllers.getProfileHandler
);

// desc    Follow user
// route   POST /api/profiles/:username/follow
profilesRoutes.post(
  '/:username/follow',
  authRequired,
  profileControllers.followUserHandler
);

// desc    Unfollow user
// route   DELETE /api/profiles/:username/follow
profilesRoutes.delete(
  '/:username/follow',
  authRequired,
  profileControllers.unfollowUserHandler
);

export default profilesRoutes;
