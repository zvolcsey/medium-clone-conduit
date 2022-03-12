import pool from '../db/db';
import {
  AuthError,
  DatabaseError,
  NotFoundError,
  ProfileProperties,
  ValidationError,
} from '../types/appClasses';
import {
  insertFollowDataText,
  findProfileText,
  deleteFollowDataText,
} from './queryTexts';
import { QueryResult } from 'pg';

const findProfile = async (
  username: string,
  reqUserId: string | null
): Promise<ProfileProperties> => {
  try {
    const queryResult: QueryResult<ProfileProperties> = await pool.query(
      findProfileText,
      [username, reqUserId, username]
    );

    return queryResult.rows[0];
  } catch (error) {
    console.log(error);
    throw new DatabaseError('Select Profile from DB was not successfully');
  }
};

const insertFollowData = async (
  reqUserId: string,
  username: string
): Promise<void> => {
  try {
    await pool.query(insertFollowDataText, [username, reqUserId]);
  } catch (error) {
    console.log(error);
    throw new DatabaseError(
      'Insert follow data to the DB was not successfully'
    );
  }
};

const deleteFollowData = async (
  reqUserId: string,
  username: string
): Promise<void> => {
  try {
    await pool.query(deleteFollowDataText, [username, reqUserId]);
  } catch (error) {
    console.log(error);
    throw new DatabaseError(
      'Delete follow data to the DB was not successfully'
    );
  }
};

export const getProfile = async (
  reqUserId: string | null,
  username: string
): Promise<ProfileProperties> => {
  let result = await findProfile(username, reqUserId);

  if (!result) throw new NotFoundError('Profile is not found');

  return result;
};

export const followUser = async (
  reqUserId: string,
  username: string
): Promise<void> => {
  const result = await findProfile(username, reqUserId);

  if (!result) throw new NotFoundError('Profile is not found');

  if (result.following)
    throw new ValidationError('You still follow this profile');

  if (result.id === reqUserId)
    throw new AuthError('You can not follow yourself');

  await insertFollowData(reqUserId, username);
};

export const unfollowUser = async (
  reqUserId: string,
  username: string
): Promise<void> => {
  const result = await findProfile(username, reqUserId);

  if (!result) throw new NotFoundError('User is not found');

  if (!result.following)
    throw new ValidationError('You still follow this profile');

  if (result.id === reqUserId)
    throw new AuthError('You can not unfollow yourself');

  await deleteFollowData(reqUserId, username);
};
