// Required imports

import pool from '../db/db';
import {
  DatabaseError,
  NotFoundError,
  RequestUserProperties,
} from '../types/appClasses';
import {
  insertArticleText,
  patchArticleText,
  findArticleByResourceIdText,
  deleteArticleText,
  insertFavoriteArticleDataText,
  deleteFavoriteArticleDataText,
  checkFavoriteText,
  insertHashtagText,
  insertHashtagArticleText,
  selectHashtagsText,
  selectHashtagCountText,
  deleteHashtagText,
  deleteHashtagArticleText,
} from './queryTexts';
import {
  ProfileProperties,
  ArticleProperties,
  AuthError,
} from '../types/appClasses';
import slugify from 'slugify';
import randomstring from 'randomstring';

import type { ArticleReqBodyProps } from '../types/appRequest.types';
import type { QueryResult } from 'pg';
import type {
  ArticleFromDB,
  CountWithId,
  isFavorite,
  TagFromDB,
} from '../types/db.types';

export const findArticleByResourceId = async (
  reqUserId: string | null,
  resourceId: string
): Promise<ArticleFromDB> => {
  try {
    const queryResult: QueryResult<ArticleFromDB> = await pool.query(
      findArticleByResourceIdText,
      [reqUserId, resourceId]
    );

    return queryResult.rows[0];
  } catch (e) {
    console.error(e);
    throw new DatabaseError(
      'Select Article Data from the DB was not successfully'
    );
  }
};

const insertArticle = async (
  reqBody: ArticleReqBodyProps,
  reqUser: RequestUserProperties,
  slug: string,
  articleResourceId: string
): Promise<ArticleFromDB> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const articleQueryResult: QueryResult<ArticleFromDB> = await client.query(
      insertArticleText,
      [
        reqBody.title,
        reqBody.description,
        reqBody.body,
        slug,
        reqUser.id,
        articleResourceId,
      ]
    );

    articleQueryResult.rows[0].favorited = false;
    articleQueryResult.rows[0].favorites_count = '0';

    for (let index in reqBody.tagList) {
      await client.query(insertHashtagText, [reqBody.tagList[index]]);
      const tag: QueryResult<TagFromDB> = await client.query(
        insertHashtagArticleText,
        [reqBody.tagList[index], articleQueryResult.rows[0].id]
      );
    }
    const tagsofArticleQueryResult: QueryResult<TagFromDB> = await client.query(
      selectHashtagsText,
      [articleQueryResult.rows[0].id]
    );
    let tagList: string[] = [];
    for (let row in tagsofArticleQueryResult.rows) {
      tagList.push(tagsofArticleQueryResult.rows[row].title);
    }

    articleQueryResult.rows[0].tag_list = tagList;

    await client.query('COMMIT');
    return articleQueryResult.rows[0];
  } catch (e) {
    await client.query('ROLLBACK');
    console.error(e);
    throw new DatabaseError('Insert Article to the DB was not successfully');
  } finally {
    client.release();
  }
};

const patchArticle = async (
  reqBody: ArticleReqBodyProps,
  reqUser: RequestUserProperties,
  slug: string,
  articleResourceId: string
): Promise<ArticleFromDB> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await pool.query(patchArticleText, [
      reqBody.title,
      reqBody.description,
      reqBody.body,
      slug,
      articleResourceId,
    ]);

    const articleQueryResult: QueryResult<ArticleFromDB> = await client.query(
      findArticleByResourceIdText,
      [reqUser.id, articleResourceId]
    );

    for (let tag of articleQueryResult.rows[0].tag_list) {
      if (!reqBody.tagList.includes(tag)) {
        const selectHashtagCount: QueryResult<CountWithId> = await client.query(
          selectHashtagCountText,
          [tag]
        );

        if (selectHashtagCount.rows[0].count === '1') {
          await client.query(deleteHashtagText, [tag]);
        }
        await client.query(deleteHashtagArticleText, [
          selectHashtagCount.rows[0].id,
          articleQueryResult.rows[0].id,
        ]);
      }
    }

    for (let tag of reqBody.tagList) {
      await client.query(insertHashtagText, [tag]);
      await client.query(insertHashtagArticleText, [
        tag,
        articleQueryResult.rows[0].id,
      ]);
    }

    articleQueryResult.rows[0].tag_list = reqBody.tagList;

    await client.query('COMMIT');
    return articleQueryResult.rows[0];
  } catch (e) {
    await client.query('ROLLBACK');
    console.error(e);
    throw new DatabaseError('Patch Article in the DB was not successfully');
  } finally {
    client.release();
  }
};

const deleteArticle = async (articleResourceId: string): Promise<void> => {
  try {
    await pool.query(deleteArticleText, [articleResourceId]);
  } catch (e) {
    console.error(e);
    throw new DatabaseError('Delete Article from the DB was not successfully');
  }
};

export const checkFavorite = async (
  reqUserId: string | null,
  articleResourceId: string
): Promise<boolean> => {
  try {
    const queryResult: QueryResult<isFavorite> = await pool.query(
      checkFavoriteText,
      [reqUserId, articleResourceId]
    );

    return queryResult.rows[0].exists;
  } catch (e) {
    console.error(e);
    throw new DatabaseError('Check favorite in the DB was not successfully');
  }
};

const insertFavoriteArticleData = async (
  reqUserId: string,
  articleResourceId: string
): Promise<void> => {
  try {
    await pool.query(insertFavoriteArticleDataText, [
      reqUserId,
      articleResourceId,
    ]);
  } catch (e) {
    console.error(e);
    throw new DatabaseError(
      'Insert favorite Article Data to the DB was not successfully'
    );
  }
};

const deleteFavoriteArticleData = async (
  reqUserId: string,
  articleResourceId: string
): Promise<void> => {
  try {
    await pool.query(deleteFavoriteArticleDataText, [
      reqUserId,
      articleResourceId,
    ]);
  } catch (e) {
    console.log(e);
    throw new DatabaseError(
      'Delete favorite Article Data from the DB was not successfully'
    );
  }
};

export const getArticle = async (
  reqUserId: string | null,
  articleResourceId: string
): Promise<ArticleProperties> => {
  const result = await findArticleByResourceId(reqUserId, articleResourceId);

  if (!result) throw new NotFoundError('Article is not found');

  const ArticleData = { ...result };

  const author = new ProfileProperties(ArticleData);
  const Article = new ArticleProperties(ArticleData, author);

  return Article;
};

export const createArticle = async (
  reqBody: ArticleReqBodyProps,
  reqUser: RequestUserProperties
): Promise<ArticleProperties> => {
  const slug = slugify(reqBody.title);

  const articleResourceId = randomstring.generate({
    length: 10,
    charset: 'alphabetic',
    readable: true,
  });

  const result = await insertArticle(reqBody, reqUser, slug, articleResourceId);

  const ArticleData = { ...result };

  const author = new ProfileProperties(reqUser);
  const Article = new ArticleProperties(ArticleData, author);

  return Article;
};

export const updateArticle = async (
  reqBody: ArticleReqBodyProps,
  reqUser: RequestUserProperties,
  articleResourceId: string
): Promise<ArticleProperties> => {
  const result = await findArticleByResourceId(reqUser.id, articleResourceId);

  if (!result) throw new NotFoundError('Article is not found');

  let slug = result.slug;

  if (reqBody.title && reqBody.title !== result.title)
    slug = slugify(reqBody.title);

  const patchedData = await patchArticle(
    reqBody,
    reqUser,
    slug,
    articleResourceId
  );

  const ArticleData = { ...patchedData };

  const author = new ProfileProperties(reqUser);
  const Article = new ArticleProperties(ArticleData, author);

  return Article;
};

export const removeArticle = async (
  articleResourceId: string,
  reqUser: RequestUserProperties
): Promise<void> => {
  const result = await findArticleByResourceId(reqUser.id, articleResourceId);

  if (!result) throw new NotFoundError('Article is not found');

  if (reqUser.id !== result.author_id)
    throw new AuthError('It is not your Article');

  await deleteArticle(articleResourceId);
};

export const favoriteArticle = async (
  articleResourceId: string,
  reqUserId: string
): Promise<void> => {
  const result = await findArticleByResourceId(reqUserId, articleResourceId);

  if (!result) throw new NotFoundError('Article is not found');

  if (result.author_id === reqUserId) {
    throw new AuthError(
      'You cannot favorite this Article, because it is your Article'
    );
  }

  await insertFavoriteArticleData(reqUserId, articleResourceId);
};

export const unFavoriteArticle = async (
  articleResourceId: string,
  reqUserId: string
): Promise<void> => {
  const result = await findArticleByResourceId(reqUserId, articleResourceId);

  if (!result) throw new NotFoundError('Article is not found');

  if (result.author_id === reqUserId) {
    throw new AuthError(
      'You cannot unfavorite this Article, because it is your Article'
    );
  }

  await deleteFavoriteArticleData(reqUserId, articleResourceId);
};
