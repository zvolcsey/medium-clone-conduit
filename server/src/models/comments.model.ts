import pool from '../db/db';
import {
  AuthError,
  CommentProperties,
  DatabaseError,
  NotFoundError,
  ProfileProperties,
  RequestUserProperties,
} from '../types/appClasses';
import {
  insertCommentText,
  findCommentsText,
  findCommentText,
  deleteCommentText,
  countCommentsText,
} from './queryTexts';
import randomstring from 'randomstring';

import type { CommentReqBodyProps } from '../types/appRequest.types';
import type {
  CommentFromDB,
  Count,
  MultipleCommentsFromDB,
} from '../types/db.types';
import type { QueryResult } from 'pg';
import { MultipleCommentsResBody } from '../types/appResponse.types';

const findCommentByResourceId = async (
  reqUserId: string | null,
  commentResourceId: string
): Promise<CommentFromDB[]> => {
  try {
    let queryResult: QueryResult<CommentFromDB> = await pool.query(
      findCommentText,
      [reqUserId, commentResourceId]
    );
    return queryResult.rows;
  } catch (error) {
    console.log(error);
    throw new DatabaseError('Select Comment from the DB was not successfully');
  }
};

const findComments = async (
  reqUserId: string | null,
  articleResourceId: string
): Promise<MultipleCommentsFromDB> => {
  try {
    const commentQueryResult: QueryResult<CommentFromDB> = await pool.query(
      findCommentsText,
      [reqUserId, articleResourceId]
    );
    const commentsCountQueryResult: QueryResult<Count> = await pool.query(
      countCommentsText,
      [articleResourceId]
    );

    const commentsFromDB = commentQueryResult.rows;
    const commentsCount = Number(commentsCountQueryResult.rows[0].count);
    return { commentsFromDB, commentsCount };
  } catch (error) {
    console.log(error);
    throw new DatabaseError('Select Comments from DB was not successfully');
  }
};

const insertComment = async (
  reqBody: CommentReqBodyProps,
  authorId: string,
  articleResourceId: string,
  commentResourceId: string
): Promise<CommentFromDB> => {
  try {
    const queryResult: QueryResult<CommentFromDB> = await pool.query(
      insertCommentText,
      [reqBody.body, authorId, articleResourceId, commentResourceId]
    );

    return queryResult.rows[0];
  } catch (error) {
    console.log(error);
    throw new DatabaseError('Insert Comment to the DB was not successfully');
  }
};

const deleteComment = async (
  commentResourceId: string,
  articleResourceId: string
): Promise<void> => {
  try {
    await pool.query(deleteCommentText, [commentResourceId, articleResourceId]);
  } catch (error) {
    console.log(error);
    throw new DatabaseError('Delete Comment from the DB was not successfully');
  }
};

export const createComment = async (
  reqBody: CommentReqBodyProps,
  reqUser: RequestUserProperties,
  articleResourceId: string
): Promise<CommentProperties> => {
  const commentResourceId = randomstring.generate({
    length: 10,
    charset: 'alphabetic',
    readable: true,
  });

  const result = await insertComment(
    reqBody,
    reqUser.id,
    articleResourceId,
    commentResourceId
  );

  const commentData = { ...result };

  const author = new ProfileProperties(reqUser);
  const comment = new CommentProperties(commentData, author);

  return comment;
};

export const getComments = async (
  reqUserId: string | null,
  articleResourceId: string
): Promise<MultipleCommentsResBody> => {
  const { commentsFromDB, commentsCount } = await findComments(
    reqUserId,
    articleResourceId
  );
  const commentsData = [...commentsFromDB];
  const comments = commentsData.map((comment: CommentFromDB) => {
    const author = new ProfileProperties(comment);
    return new CommentProperties(comment, author);
  });
  return { comments, commentsCount };
};

export const removeComment = async (
  reqUserId: string,
  articleResourceId: string,
  commentResourceId: string
): Promise<void> => {
  const commentData = await findCommentByResourceId(
    reqUserId,
    commentResourceId
  );

  if (commentData.length === 0) throw new NotFoundError('Comment is not found');

  if (reqUserId !== commentData[0].author_id)
    throw new AuthError('It is not your comment');

  await deleteComment(commentResourceId, articleResourceId);
};
