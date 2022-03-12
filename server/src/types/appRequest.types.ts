import type { Request } from 'express';
import { RequestUserProperties } from './appClasses';

export interface Header {
  [key: string]: string | undefined;
  Authorization?: string;
}

export interface SignTokenPayload {
  sub: string;
  iat: number;
}

export interface RequestUser {
  id: string;
  token?: string;
  created_at: string;
  updated_at: string;
  username: string;
  password: string;
  bio: string;
  image: string;
}

export interface ConduitRequest<BodyType> extends Request {
  user?: RequestUserProperties | null;
  body: BodyType;
}

export interface AuthUserReqBody {
  user: AuthUserReqBodyProps;
}

export interface AuthUserReqBodyProps {
  [key: string]: string;
  username: string;
  password: string;
}

export interface UpdateUserReqBody {
  user: UpdateUserReqBodyProps;
}

export interface UpdateUserReqBodyProps {
  [key: string]: string | undefined | null;
  username?: string | undefined | null;
  password?: string | undefined | null;
  bio?: string | undefined | null;
  image?: string | undefined | null;
}

export interface ArticleReqBody {
  article: ArticleReqBodyProps;
}

export interface ArticleReqBodyProps {
  [key: string]: string | string[];
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface CommentReqBody {
  comment: CommentReqBodyProps;
}

export interface CommentReqBodyProps {
  body: string;
}
