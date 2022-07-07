import { generateId } from './utility';

import type { InputValidation } from '../types/appResponse.types';

export const checkUsername = (username: string) => {
  let errors: InputValidation[] = [];

  if (username.length === 0) {
    errors.push({ id: generateId(), text: 'Username is empty' });
    return errors;
  }
  if (username.length < 6 || username.length > 15)
    errors.push({
      id: generateId(),
      text: 'Username must be between 6 and 15 characters',
    });

  return errors;
};

export const checkPassword = (password: string) => {
  let errors: InputValidation[] = [];

  if (password.length === 0) {
    errors.push({ id: generateId(), text: 'Password is empty' });
    return errors;
  }
  if (password.length < 8 || password.length > 64)
    errors.push({
      id: generateId(),
      text: 'Password must be between 8 and 64 characters',
    });

  return errors;
};

export const checkBio = (bio: string): InputValidation[] => {
  let errors: InputValidation[] = [];

  if (bio.length > 1000)
    errors.push({
      id: generateId(),
      text: 'Biography can be maximum 1000 characters',
    });

  return errors;
};

export const checkCommentBody = (body: string): InputValidation[] => {
  let errors: InputValidation[] = [];

  if (body.length === 0) {
    errors.push({ id: generateId(), text: 'Comment body is empty' });
    return errors;
  }
  if (body.length > 3000)
    errors.push({
      id: generateId(),
      text: 'Comment body can be maximum 3000 characters',
    });

  return errors;
};

export const checkTitle = (title: string): InputValidation[] => {
  let errors: InputValidation[] = [];

  if (title.length === 0) {
    errors.push({ id: generateId(), text: 'Article title is empty' });
    return errors;
  }
  if (title.length > 30)
    errors.push({
      id: generateId(),
      text: 'Article title can be maximum 30 characters',
    });

  return errors;
};

export const checkDescription = (description: string): InputValidation[] => {
  let errors: InputValidation[] = [];

  if (description.length === 0) {
    errors.push({ id: generateId(), text: 'Article description is empty' });
    return errors;
  }
  if (description.length > 1000)
    errors.push({
      id: generateId(),
      text: 'Article description can be maximum 1000 characters',
    });

  return errors;
};

export const checkBody = (body: string): InputValidation[] => {
  let errors: InputValidation[] = [];

  if (body.length === 0) {
    errors.push({ id: generateId(), text: 'Article body is empty' });
    return errors;
  }
  if (body.length > 100000)
    errors.push({
      id: generateId(),
      text: 'Article body can be maximum 100.000 characters',
    });

  return errors;
};

export const checkTags = (
  tags: string[],
  tagRegex: RegExp
): InputValidation[] => {
  let error: InputValidation[] = [];

  if (tags.length > 30) {
    error.push({ id: generateId(), text: 'Maximum number of tag is 30' });
    return error;
  }

  let temp: string[] = [];

  for (let tag of tags) {
    if (temp.includes(tag)) {
      error.push({
        id: generateId(),
        text: 'Each tag must be unique',
      });
      temp = [];
      return error;
    }

    temp.push(tag);

    if (!tag.match(tagRegex)) {
      error.push({
        id: generateId(),
        text: 'One of the hashtag contain not allowed characters',
      });
      return error;
    }

    if (tag.length < 2 || tag.length > 15) {
      error.push({
        id: generateId(),
        text: 'Each tag must be between 2 and 15 characters',
      });
      return error;
    }
  }

  temp = [];

  return error;
};
