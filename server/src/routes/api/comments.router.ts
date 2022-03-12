import express from 'express';
import * as commentsControllers from '../../controller/comments.controller';
import { authRequired, authOptional } from '../../middleware/middlewares';

const commentsRoutes = express.Router();

// desc    Create a comment
// route   GET /api/articles/:articleResourceId/comments
commentsRoutes.post(
  '/:articleResourceId/comments',
  authRequired,
  commentsControllers.createCommentHandler
);

// desc    Get a comment
// route   GET /api/articles/:articleResourceId/comments
commentsRoutes.get(
  '/:articleResourceId/comments',
  authOptional,
  commentsControllers.getCommentsHandler
);

// desc    Delete a comment
// route   GET /api/articles/:articleResourceId/comments/:commentResourceId
commentsRoutes.delete(
  '/:articleResourceId/comments/:commentResourceId',
  authRequired,
  commentsControllers.deleteCommentHandler
);

export default commentsRoutes;
