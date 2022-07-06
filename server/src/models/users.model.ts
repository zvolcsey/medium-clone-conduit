import pool from '../db/db';
import { QueryResult } from 'pg';
import {
  DatabaseError,
  ValidationError,
  NotFoundError,
  AuthError,
  UserProperties,
  RequestUserProperties,
} from '../types/appClasses';
import { findUserText, insertUserText, patchUserText } from './queryTexts';
import { hashPassword, comparePassword, signToken } from '../utils/utility';

import type { UpdateUserReqBodyProps } from '../types/appRequest.types';
import type { UserFromDB } from '../types/db.types';

export const findUserByUsername = async (
  username: string
): Promise<UserFromDB> => {
  try {
    const queryResult: QueryResult<UserFromDB> = await pool.query(
      findUserText,
      [username]
    );
    return queryResult.rows[0];
  } catch (e) {
    console.error(e);
    throw new DatabaseError('Select User from DB was not successfully');
  }
};

const insertUser = async (
  username: string,
  password: string
): Promise<UserFromDB> => {
  try {
    const queryResult: QueryResult<UserFromDB> = await pool.query(
      insertUserText,
      [username, password]
    );

    return queryResult.rows[0];
  } catch (e) {
    console.error(e);
    throw new DatabaseError('Insert to the DB was not successfully');
  }
};

const patchUser = async (
  reqBody: Partial<UpdateUserReqBodyProps>,
  reqUser: RequestUserProperties,
  newPassword: string | null
): Promise<UserFromDB> => {
  try {
    const queryResult: QueryResult<UserFromDB> = await pool.query(
      patchUserText,
      [reqBody.username, newPassword, reqBody.bio, reqUser.id]
    );
    return queryResult.rows[0];
  } catch (e) {
    console.error(e);
    throw new DatabaseError('Patch data in the DB was not successfully');
  }
};

export const signIn = async (
  username: string,
  password: string
): Promise<UserProperties> => {
  const result = await findUserByUsername(username);

  if (!result) throw new AuthError('User is not exist');

  const userData = { ...result };

  const isSame = await comparePassword(password, userData.password);

  if (!isSame) throw new AuthError('Password is wrong');

  const token = await signToken(userData.username);

  const user = new UserProperties(userData, token);

  return user;
};

export const signUp = async (
  username: string,
  password: string
): Promise<UserProperties> => {
  let result = await findUserByUsername(username);

  if (result) throw new AuthError('User is exist');

  const hashedPassword = await hashPassword(password);

  const userFromDB = await insertUser(username, hashedPassword);

  const userData = { ...userFromDB };

  const token = await signToken(userData.username);

  const user = new UserProperties(userData, token);

  return user;
};

export const getCurrentUser = async (
  reqUsername: string,
  token: string
): Promise<UserProperties> => {
  const result = await findUserByUsername(reqUsername);

  if (!result) throw new AuthError('User is not exists');

  const userData = { ...result };
  const user = new UserProperties(userData, token);

  return user;
};

export const updateUser = async (
  reqBody: UpdateUserReqBodyProps,
  reqUser: RequestUserProperties,
  token: string
): Promise<UserProperties> => {
  const result = await findUserByUsername(reqUser.username);

  if (!result) throw new NotFoundError('User is not found');

  if (typeof reqBody.username === 'undefined') reqBody.username = null;
  if (typeof reqBody.bio === 'undefined') reqBody.bio = null;
  if (typeof reqBody.password === 'undefined') reqBody.password = null;

  let newPassword: string | null = null;
  if (reqBody.password) newPassword = await hashPassword(reqBody.password);

  const patchedUser = await patchUser(reqBody, reqUser, newPassword);

  const userData = { ...patchedUser };

  let authToken: string | undefined = undefined;

  reqBody.username
    ? (authToken = await signToken(userData.username))
    : (authToken = token);

  const user = new UserProperties(userData, authToken);

  return user;
};
