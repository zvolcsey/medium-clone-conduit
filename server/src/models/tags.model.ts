import { TagFromDB } from '../types/db.types';
import pool from '../db/db';
import { getPopularTagsText, selectHashtagsText } from './queryTexts';
import { DatabaseError } from '../types/appClasses';

import type { QueryResult } from 'pg';

/*export const selectAllTags = async (): Promise<string[]> => {
  try {
    const queryResult: QueryResult<TagFromDB> = await pool.query(
      selectAllHashtagsText,
      [postId]
    );

    const tagList = [];
    for (let i = 0; i < queryResult.rows.length; i++) {
      tagList.push(queryResult.rows[i].title);
    }

    return tagList;
  } catch (error) {
    console.log(error);
    throw new DatabaseError('Select tags from DB was not successfully');
  }
};*/

export const selectTags = async (postId: string): Promise<string[]> => {
  try {
    const queryResult: QueryResult<TagFromDB> = await pool.query(
      selectHashtagsText,
      [postId]
    );

    const tagList = [];
    for (let i = 0; i < queryResult.rows.length; i++) {
      tagList.push(queryResult.rows[i].title);
    }

    return tagList;
  } catch (error) {
    console.log(error);
    throw new DatabaseError('Select tags from DB was not successfully');
  }
};

const findPopularTags = async (limit: number): Promise<TagFromDB[]> => {
  try {
    const queryResult: QueryResult<TagFromDB> = await pool.query(
      getPopularTagsText,
      [limit]
    );

    return queryResult.rows;
  } catch {
    throw new DatabaseError('Select popular tags from DB was not successfully');
  }
};

export const getPopularTags = async (limit: number) => {
  const resultArray = await findPopularTags(limit);

  const popularTagsData = [...resultArray];

  let popularTags: string[] = [];

  for (let tag in popularTagsData) {
    popularTags.push(popularTagsData[tag].title);
  }

  return popularTags;
};
