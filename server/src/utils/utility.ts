import { jwtVerify, SignJWT, JWTPayload } from 'jose';
import { createSecretKey } from 'crypto';
import { AuthError } from '../types/appClasses';
import { compare, hash } from 'bcrypt';
import dotenv from 'dotenv';
import { ValidationError } from '../types/appClasses';

import type { SignTokenPayload } from '../types/appRequest.types';
import type QueryString from 'qs';

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
