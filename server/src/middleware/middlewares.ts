import * as jwtMethods from '../utils/utility';
import * as userService from '../models/users.model';
import {
  checkUsername,
  checkPassword,
  checkCommentBody,
  checkTitle,
  checkDescription,
  checkBody,
  checkTags,
  checkBio,
} from '../utils/utility';
import { USERNAME_REGEX } from '../utils/constant';
import { PASSWORD_REGEX } from '../utils/constant';
import { PASSWORD_SPECIAL_CHARS_REGEX } from '../utils/constant';
import { TAG_REGEX } from '../utils/constant';

import {
  RequestUserProperties,
  AuthError,
  ValidationError,
  FoundError,
  NotFoundError,
} from '../types/appClasses';
import type { ErrorResBody, InputValidation } from '../types/appResponse.types';
import type { Response, NextFunction } from 'express';
import type {
  ConduitRequest,
  AuthUserReqBody,
  CommentReqBody,
  ArticleReqBody,
  UpdateUserReqBody,
} from '../types/appRequest.types';

export const setHeader = (
  req: ConduitRequest<unknown>,
  res: Response,
  next: NextFunction
) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};

export const authRequired = async (
  req: ConduitRequest<unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = jwtMethods.getTokenFromHeader(req.headers.authorization);
    if (!token)
      throw new AuthError('Authorization Error - Token is not exists');

    const payload = await jwtMethods.verifyToken(token);

    if (!payload.sub) throw new AuthError('JWT Payload sub is not exists');

    const queryResult = await userService.findUserByUsername(payload?.sub);

    if (!queryResult) throw new AuthError('Logged user is not found');

    const userData = { ...queryResult };

    req.user = new RequestUserProperties(userData, token);

    next();
  } catch (err) {
    next(err);
  }
};

export const authOptional = async (
  req: ConduitRequest<unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = jwtMethods.getTokenFromHeader(req.headers.authorization);

    if (token) {
      const payload = await jwtMethods.verifyToken(token);

      if (!payload.sub) throw new AuthError('JWT Payload sub is not exists');

      const queryResult = await userService.findUserByUsername(payload.sub);

      if (!queryResult) throw new AuthError('Logged user is not found');

      const userData = { ...queryResult };

      req.user = new RequestUserProperties(userData, token);
    } else {
      req.user = null;
    }
    next();
  } catch (err) {
    next(err);
  }
};

export const errorHandler = (
  err: AuthError | ValidationError | FoundError | NotFoundError | Error,
  req: ConduitRequest<unknown>,
  res: Response,
  next: NextFunction
): Response<ErrorResBody> => {
  let statusCode = 500;

  switch (err.name) {
    case 'Found Error':
      statusCode = 302;
      break;
    case 'Validation Error':
      statusCode = 422;
      break;
    case 'Authorization Error':
      statusCode = 401;
      break;
    case 'Forbidden Error':
      statusCode = 403;
      break;
    case 'Not Found Error':
      statusCode = 404;
      break;
    default:
      break;
  }

  return res.status(statusCode).json({
    errors: {
      body: [err],
    },
  });
};

export const authInputValidation = (
  req: ConduitRequest<AuthUserReqBody>,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.body.user) {
      console.log('Missing user object from request body');
    }
    const { username, password } = req.body.user;

    const usernameErrors = checkUsername(username, USERNAME_REGEX);

    const errors = usernameErrors.concat(
      checkPassword(password, PASSWORD_REGEX, PASSWORD_SPECIAL_CHARS_REGEX)
    );

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
      usernameErrors = checkUsername(username, USERNAME_REGEX);
    }

    if (password) {
      passwordErrors = checkPassword(
        password,
        PASSWORD_REGEX,
        PASSWORD_SPECIAL_CHARS_REGEX
      );
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
