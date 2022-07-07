import {
  checkCommentBody,
  checkTitle,
  checkDescription,
  checkBody,
  checkTags,
  checkBio,
  checkUsername,
  checkPassword,
} from '../utils/validation.utility';
import { TAG_REGEX } from '../utils/constant';

import { ValidationError } from '../types/appClasses';
import type { InputValidation } from '../types/appResponse.types';
import type { Response, NextFunction } from 'express';
import type {
  ConduitRequest,
  AuthUserReqBody,
  UpdateUserReqBody,
  ArticleReqBody,
  CommentReqBody,
} from '../types/appRequest.types';

export const authInputValidation = (
  req: ConduitRequest<AuthUserReqBody>,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.body.user) {
      throw new ValidationError('Missing user object');
    }
    const { username, password } = req.body.user;

    const usernameErrors = checkUsername(username);

    const errors = usernameErrors.concat(checkPassword(password));

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    next();
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const updateUserInputValidation = (
  req: ConduitRequest<UpdateUserReqBody>,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.body.user) {
      console.log('Missing user object from request body');
    }
    const { username, password, bio } = req.body.user;
    let usernameErrors: InputValidation[] = [];
    let passwordErrors: InputValidation[] = [];
    let bioErrors: InputValidation[] = [];

    if (username) {
      usernameErrors = checkUsername(username);
    }

    if (password) {
      passwordErrors = checkPassword(password);
    }

    if (bio) {
      bioErrors = checkBio(bio);
    }

    const errors = usernameErrors.concat(passwordErrors, bioErrors);

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const commentInputValidation = (
  req: ConduitRequest<CommentReqBody>,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.body.comment) {
      console.log('Missing comment object from request body');
    }
    const { body } = req.body.comment;

    const errors = checkCommentBody(body);

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const articleInputValidation = (
  req: ConduitRequest<ArticleReqBody>,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.body.article) {
      console.log('Missing user object from request body');
    }
    const { title, description, body, tagList } = req.body.article;

    const titleErrors = checkTitle(title);
    const descriptionErrors = checkDescription(description);
    const bodyErrors = checkBody(body);
    const tagsError = checkTags(tagList, TAG_REGEX);

    const errors = titleErrors.concat(descriptionErrors, bodyErrors, tagsError);

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    next();
  } catch (err) {
    next(err);
  }
};
