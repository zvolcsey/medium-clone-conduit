import express from 'express';
import {
  getArticleHandler,
  createArticleHandler,
  updateArticleHandler,
  deleteArticleHandler,
  favoriteArticleHandler,
  unfavoriteArticleHandler,
} from '../../controller/articles.controller';
import {
  authRequired,
  authOptional,
  articleInputValidation,
} from '../../middleware/middlewares';

const articlesRoutes = express.Router();

// desc    Get a article
// route   GET /api/articles/:articleResourceId
articlesRoutes.get('/:articleResourceId', authOptional, getArticleHandler);

// desc    Create a article
// route   POST /api/articles
articlesRoutes.post(
  '/',
  authRequired,
  articleInputValidation,
  createArticleHandler
);

// desc    Update a article
// route   PATCH /api/articles/:articleResourceId
articlesRoutes.patch(
  '/:articleResourceId',
  authRequired,
  articleInputValidation,
  updateArticleHandler
);

// desc    Delete a article
// route   DELETE /api/articles/:articleResourceId
articlesRoutes.delete(
  '/:articleResourceId',
  authRequired,
  deleteArticleHandler
);

// desc    Favorite a article
// route   POST /api/articles/:articleResourceId/favorite
articlesRoutes.post(
  '/:articleResourceId/favorite',
  authRequired,
  favoriteArticleHandler
);

// desc    Unfavorite a article
// route   DELETE /api/articles/:articleResourceId/favorite
articlesRoutes.delete(
  '/:articleResourceId/favorite',
  authRequired,
  unfavoriteArticleHandler
);

export default articlesRoutes;
