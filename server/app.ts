import express from 'express';
import dotenv from 'dotenv';

import { setHeader, errorHandler } from './src/middleware/middlewares';

import apiRoutes from './src/routes/index.router';
import usersRoutes from './src/routes/api/user.router';
import articlesListRoutes from './src/routes/api/articleList.router';
import articlesRoutes from './src/routes/api/articles.router';
import profilesRoutes from './src/routes/api/profiles.router';
import commentsRoutes from './src/routes/api/comments.router';
import tagsRoutes from './src/routes/api/tags.router';

const app = express();

dotenv.config();

app.use(express.json());

app.use(setHeader);

app.use('/', apiRoutes);
app.use('/api', [usersRoutes, tagsRoutes]);
app.use('/api/articles', [articlesListRoutes, articlesRoutes, commentsRoutes]);
app.use('/api/profiles', profilesRoutes);

app.use(errorHandler);

app.listen(process.env.API_PORT, () =>
  console.log(`Api running on port ${process.env.API_PORT}`)
);
