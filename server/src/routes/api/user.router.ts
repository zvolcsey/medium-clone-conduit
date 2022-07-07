import express from 'express';
import * as userControllers from '../../controller/users.controller';
import { authRequired } from '../../middleware/middlewares';
import {
  authInputValidation,
  updateUserInputValidation,
} from '../../middleware/validation.middleware';

const usersRoutes = express.Router();

// desc    Sign in the user
// route   POST /api/users/sign-in
usersRoutes.post('/users/sign-in', userControllers.postSignInHandler);

// desc    Sign up the user
// route   POST /api/users
usersRoutes.post(
  '/users',
  authInputValidation,
  userControllers.postSignUpHandler
);

// desc    Get the current user
// route   GET /api/user
usersRoutes.get('/user', authRequired, userControllers.getCurrentUserHandler);

// desc    Update the user
// route   PATCH /api/user
usersRoutes.patch(
  '/user',
  updateUserInputValidation,
  authRequired,
  userControllers.updateUserHandler
);

export default usersRoutes;
