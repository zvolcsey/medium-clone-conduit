import express from 'express';
import {
  getArticlesHandler,
  feedArticlesHandler,
} from '../../controller/articleList.controller';
import { authRequired, authOptional } from '../../middleware/middlewares';

const articlesListRoutes = express.Router();

// desc    List articles
// route   GET /api/articles
articlesListRoutes.get('/', authOptional, getArticlesHandler);

// desc    Feed articles
// route   GET /api/articles/feed
articlesListRoutes.get('/feed', authRequired, feedArticlesHandler);

export default articlesListRoutes;
