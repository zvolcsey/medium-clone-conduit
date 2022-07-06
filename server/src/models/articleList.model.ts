// Required imports

import pool from '../db/db';
import { DatabaseError, RequestUserProperties } from '../types/appClasses';
import {
  findArticlesText,
  findArticlesByAuthorText,
  findArticlesFavoritedByUserText,
  findArticlesByTagText,
  findFeedArticlesText,
  countFeedArticlesText,
  countArticlesFavoritedByUserText,
  countArticlesByTagText,
  countArticlesText,
  countArticlesByAuthorText,
} from './queryTexts';

import { ProfileProperties, ArticleProperties } from '../types/appClasses';
import type { QueryResult, QueryArrayResult } from 'pg';
import {
  Count,
  ArticleFromDB,
  MultipleArticlesFromDB,
} from '../types/db.types';
import type { MultipleArticlesResBody } from '../types/appResponse.types';

// Define Service functions

const findArticles = async (
  reqUserId: string | null,
  limit: number,
  offset: number,
  author: string | null = null,
  favoritedByUser: string | null = null,
  tag: string | null = null
): Promise<MultipleArticlesFromDB> => {
  try {
    if (author) {
      const articlesQueryResult: QueryResult<ArticleFromDB> = await pool.query(
        findArticlesByAuthorText,
        [reqUserId, author, limit, offset]
      );
      const articlesCountQueryResult: QueryResult<Count> = await pool.query(
        countArticlesByAuthorText,
        [author]
      );
      const articlesFromDB = articlesQueryResult.rows;
      const articlesCount = Number(articlesCountQueryResult.rows[0].count);
      return { articlesFromDB, articlesCount };
    }
    if (favoritedByUser) {
      const articlesQueryResult = await pool.query(
        findArticlesFavoritedByUserText,
        [reqUserId, favoritedByUser, limit, offset]
      );
      const articlesCountQueryResult: QueryResult<Count> = await pool.query(
        countArticlesFavoritedByUserText,
        [favoritedByUser]
      );
      const articlesFromDB = articlesQueryResult.rows;
      const articlesCount = Number(articlesCountQueryResult.rows[0].count);
      return { articlesFromDB, articlesCount };
    }
    if (tag) {
      const articlesQueryResult = await pool.query(findArticlesByTagText, [
        reqUserId,
        tag,
        limit,
        offset,
      ]);
      const articlesCountQueryResult: QueryResult<Count> = await pool.query(
        countArticlesByTagText,
        [tag]
      );
      const articlesFromDB = articlesQueryResult.rows;
      const articlesCount = Number(articlesCountQueryResult.rows[0].count);
      return { articlesFromDB, articlesCount };
    }
    const articlesQueryResult = await pool.query(findArticlesText, [
      reqUserId,
      limit,
      offset,
    ]);
    const articlesCountQueryResult: QueryResult<Count> = await pool.query(
      countArticlesText,
      []
    );
    const articlesFromDB = articlesQueryResult.rows;
    const articlesCount = Number(articlesCountQueryResult.rows[0].count);
    return { articlesFromDB, articlesCount };
  } catch (e) {
    console.error(e);
    throw new DatabaseError(
      'Get articles and articlesCount from DB was not successfully'
    );
  }
};

const findFeedArticles = async (
  reqUserId: string,
  limit: number,
  offset: number
) => {
  try {
    const queryResult: QueryResult<ArticleFromDB> = await pool.query(
      findFeedArticlesText,
      [reqUserId, limit, offset]
    );
    return queryResult.rows;
  } catch (e) {
    console.error(e);
    throw new DatabaseError(
      'Select feed articles from DB was not successfully'
    );
  }
};

const countFeedArticles = async (reqUserId: string): Promise<number> => {
  try {
    const queryResult: QueryResult<Count> = await pool.query(
      countFeedArticlesText,
      [reqUserId]
    );
    const count = Number(queryResult.rows[0].count);
    return count;
  } catch (e) {
    console.error(e);
    throw new DatabaseError('Count feed articles from DB was not successfully');
  }
};

export const getArticles = async (
  reqUser: RequestUserProperties | null | undefined,
  limit: number,
  offset: number,
  author: string | null = null,
  favoritedByUser: string | null = null,
  tag: string | null = null
): Promise<MultipleArticlesResBody> => {
  let reqUserId: string | null = null;
  if (reqUser) {
    reqUserId = reqUser.id;
  }

  const { articlesFromDB, articlesCount } = await findArticles(
    reqUserId,
    limit,
    offset,
    author,
    favoritedByUser,
    tag
  );
  const articlesData = [...articlesFromDB];

  const articles = articlesData.map((article: ArticleFromDB) => {
    const author = new ProfileProperties(article);
    return new ArticleProperties(article, author);
  });

  return { articles, articlesCount };
};

export const getFeedArticles = async (
  reqUser: RequestUserProperties,
  limit: number,
  offset: number
): Promise<MultipleArticlesResBody> => {
  const articlesResult = await findFeedArticles(reqUser.id, limit, offset);

  const articlesData = [...articlesResult];

  const articlesCount = await countFeedArticles(reqUser.id);

  const articles = articlesData.map((article: ArticleFromDB) => {
    const author = new ProfileProperties(article);
    return new ArticleProperties(article, author);
  });

  return { articles, articlesCount };
};
