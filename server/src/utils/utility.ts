import { jwtVerify, SignJWT, JWTPayload } from 'jose';
import { createSecretKey } from 'crypto';
import { AuthError } from '../types/appClasses';
import { compare, hash } from 'bcrypt';
import dotenv from 'dotenv';
import { ValidationError } from '../types/appClasses';
import randomstring from 'randomstring';

import type { SignTokenPayload } from '../types/appRequest.types';
import type QueryString from 'qs';
import type { InputValidation } from '../types/appResponse.types';

dotenv.config();

export const getTokenFromHeader = (
  token: string | undefined
): string | null => {
  if (token && token.split(' ')[0] === 'Token') return token.split(' ')[1];
  return null;
};

export const signToken = async (username: string): Promise<string> => {
  const today = Date.now();

  if (!process.env.JWT_SECRET) throw new AuthError('Secret is undefined');

  const secret = createSecretKey(Buffer.from(process.env.JWT_SECRET));

  const payload: SignTokenPayload = { sub: username, iat: today };

  try {
    const jwt = await new SignJWT({ payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setSubject(payload.sub)
      .sign(secret);
    return jwt;
  } catch (error) {
    throw new AuthError('Sign JWT was not successfully');
  }
};

export const verifyToken = async (token: string): Promise<JWTPayload> => {
  if (!process.env.JWT_SECRET) throw new AuthError('Secret is undefined');
  const secret = createSecretKey(Buffer.from(process.env.JWT_SECRET));
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    throw new AuthError('JWT Verify was not successfully');
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds: number = 10;
  try {
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new AuthError('Password hashing was not successfully');
  }
};

export const comparePassword = (
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const isValid = compare(plainTextPassword, hashedPassword);
    return isValid;
  } catch (error) {
    throw new AuthError('Compare was not successfully');
  }
};

export const getNumberQueryParamWithDefault = (
  query: QueryString.ParsedQs,
  name: string,
  defaultValue: number
): number => {
  if (typeof query[name] === 'undefined') return defaultValue;
  return getQueryParam(query, name, true) as number;
};

export const getStringQueryParam = (
  query: QueryString.ParsedQs,
  name: string,
  defaultValue: string | null
): string | null => {
  if (typeof query[name] === 'undefined') return defaultValue;
  return getQueryParam(query, name) as string;
};

export const getQueryParam = (
  query: QueryString.ParsedQs,
  name: string,
  integer = false
): number | string | null => {
  if (integer) {
    const n = Number(query[name]);
    if (typeof n !== 'number') {
      throw new ValidationError(
        `${name.charAt(0).toUpperCase() + name.slice(1)} is not a number`
      );
    }
    if (name === 'limit' && n > 20) {
      throw new ValidationError('Limit must be <= 20');
    }
    return n;
  } else {
    if (typeof query[name] !== 'string') {
      throw new ValidationError('Wrong value of filter');
    } else {
      const s = String(query[name]);
      return s;
    }
  }
};

export const generateId = (): string => {
  const id = randomstring.generate({
    length: 10,
    charset: 'alphabetic',
    readable: true,
  });
  return id;
};

export const checkUsername = (
  username: string,
  usernameRegex: RegExp
): InputValidation[] => {
  let errors: InputValidation[] = [];

  if (username.length === 0)
    errors.push({ id: generateId(), text: 'Username is empty' });
  if (username.length < 6 || username.length > 15)
    errors.push({
      id: generateId(),
      text: 'Username must be between 6 and 15 characters',
    });
  if (!usernameRegex.test(username))
    errors.push({
      id: generateId(),
      text: 'Username contain not allowed character',
    });

  return errors;
};

export const checkPassword = (
  password: string,
  passwordRegex: RegExp,
  specialCharacterRegex: RegExp
): InputValidation[] => {
  let errors: InputValidation[] = [];

  if (password.length === 0)
    errors.push({ id: generateId(), text: 'Password is empty' });
  if (password.length < 8 || password.length > 15)
    errors.push({
      id: generateId(),
      text: 'Password must be between 8 and 15 characters',
    });
  if (!passwordRegex.test(password))
    errors.push({
      id: generateId(),
      text: 'Password contain not allowed character',
    });
  if (!password.match(specialCharacterRegex))
    errors.push({
      id: generateId(),
      text: 'Password must contain minimum 1 special character',
    });

  return errors;
};

export const checkCommentBody = (body: string): InputValidation[] => {
  let errors: InputValidation[] = [];

  if (body.length === 0)
    errors.push({ id: generateId(), text: 'Length of the comment is 0' });
  if (body.length < 8 || body.length > 2500)
    errors.push({
      id: generateId(),
      text: 'Comment must be between 8 and 2500 characters',
    });

  return errors;
};

export const checkTitle = (title: string): InputValidation[] => {
  let errors: InputValidation[] = [];

  if (title.length === 0)
    errors.push({ id: generateId(), text: 'Article title is empty' });
  if (title.length < 6 || title.length > 15)
    errors.push({
      id: generateId(),
      text: 'Article title must be between 6 and 15 characters',
    });

  return errors;
};

export const checkDescription = (description: string): InputValidation[] => {
  let errors: InputValidation[] = [];

  if (description.length === 0)
    errors.push({ id: generateId(), text: 'Article description is empty' });
  if (description.length < 6 || description.length > 200)
    errors.push({
      id: generateId(),
      text: 'Article description must be between 6 and 200 characters',
    });

  return errors;
};

export const checkBody = (body: string): InputValidation[] => {
  let errors: InputValidation[] = [];

  if (body.length === 0)
    errors.push({ id: generateId(), text: 'Article body is empty' });
  if (body.length < 6 || body.length > 3000)
    errors.push({
      id: generateId(),
      text: 'Article body must be between 6 and 3000 characters',
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

  for (let tag of tags) {
    if (!tag.match(tagRegex)) {
      error.push({
        id: generateId(),
        text: 'One of the hashtag contain not allowed characters',
      });
      return error;
    }

    if (tag.length < 2 && tag.length > 15) {
      error.push({
        id: generateId(),
        text: 'Each tag must be between 2 and 15 characters',
      });
      return error;
    }
  }

  return error;
};
