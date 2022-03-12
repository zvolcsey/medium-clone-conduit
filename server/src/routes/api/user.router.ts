import express from 'express';
import * as userControllers from '../../controller/users.controller';
import {
  authRequired,
  authInputValidation,
} from '../../middleware/middlewares';

const usersRoutes = express.Router();

// desc    Sign in the user
// route   POST /api/users/sign-in
usersRoutes.post(
  '/users/sign-in',
  authInputValidation,
  userControllers.postSignInHandler
);

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
usersRoutes.patch('/user', authRequired, userControllers.updateUserHandler);

export default usersRoutes;
