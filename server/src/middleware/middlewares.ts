import * as jwtMethods from '../utils/utility';
import * as userService from '../models/users.model';
import { ErrorResBody } from '../types/appResponse.types';
import {
  RequestUserProperties,
  AuthError,
  ValidationError,
  FoundError,
  NotFoundError,
} from '../types/appClasses';

import type { Response, NextFunction } from 'express';
import type {
  ConduitRequest,
  AuthUserReqBody,
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
    if (!req.body.user || !req.body.user.username || !req.body.user.password)
      throw new ValidationError('Missing Data from Request Body');
    if (req.body.user.username.length < 6 || req.body.user.username.length > 15)
      throw new ValidationError('Username must be between 6 and 15 characters');
    if (req.body.user.password.length < 8 || req.body.user.password.length > 15)
      throw new ValidationError('Password must be between 8 and 15 characters');
    next();
  } catch (err) {
    next(err);
  }
};
