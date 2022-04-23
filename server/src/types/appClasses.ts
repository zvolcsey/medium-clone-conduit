import { generateId } from '../utils/utility';

import type { InputValidation } from './appResponse.types';
import type { UserFromDB, ArticleFromDB, CommentFromDB } from './db.types';

export class RequestUserProperties {
  id: string;
  token: string | undefined;
  username: string;
  bio: string;
  following: boolean = false;

  constructor(user: UserFromDB, token: string) {
    this.id = user.id;
    this.token = token;
    this.username = user.username;
    this.bio = user.bio;
    this.following = false;
  }
}

export class UserProperties {
  token: string;
  username: string;
  bio: string;

  constructor(user: UserFromDB, token: string) {
    this.token = token;
    this.username = user.username;
    this.bio = user.bio;
  }
}

export class ProfileProperties {
  [key: string]: string | boolean | undefined;
  username: string;
  bio?: string;
  following = false;

  constructor(
    data:
      | ProfileProperties
      | RequestUserProperties
      | ArticleFromDB
      | CommentFromDB
  ) {
    this.username = data.username;
    this.bio = data.bio;
    this.following = data.following;
  }
}

export class ArticleProperties {
  resourceId: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: ProfileProperties;

  constructor(article: ArticleFromDB, author: ProfileProperties) {
    this.resourceId = article.resource_id;
    this.slug = article.slug;
    this.title = article.title;
    this.description = article.description;
    this.body = article.body;
    this.tagList = article.tag_list;
    this.createdAt = article.created_at;
    this.updatedAt = article.updated_at;
    this.favorited = article.favorited;
    this.favoritesCount = Number(article.favorites_count) ?? 0;
    this.author = author;
  }
}

export class CommentProperties {
  resourceId: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: ProfileProperties;

  constructor(comment: CommentFromDB, author: ProfileProperties) {
    this.resourceId = comment.resource_id;
    this.body = comment.body;
    this.createdAt = comment.created_at;
    this.updatedAt = comment.updated_at;
    this.body = comment.body;
    this.author = author;
  }
}

// Error Classes

export class AuthError {
  id: string;
  name: string;
  message: string;

  constructor(message: string) {
    this.id = generateId();
    this.name = 'Authorization Error';
    this.message = message;
  }
}

export class ForbiddenError {
  id: string;
  name: string;
  message: string;

  constructor(message: string) {
    this.id = generateId();
    this.name = 'Forbidden Error';
    this.message = message;
  }
}

export class ValidationError {
  id: string;
  name: string;
  message: string | InputValidation[];

  constructor(message: string | InputValidation[]) {
    this.id = generateId();
    this.name = 'Validation Error';
    this.message = message;
  }
}

export class NotFoundError {
  id: string;
  name: string;
  message: string;

  constructor(message: string) {
    this.id = generateId();
    this.name = 'Not Found Error';
    this.message = message;
  }
}

export class FoundError {
  id: string;
  name: string;
  message: string;

  constructor(message: string) {
    this.id = generateId();
    this.name = 'Found Error';
    this.message = message;
  }
}

export class DatabaseError {
  id: string;
  name: string;
  message: string;

  constructor(message: string) {
    this.id = generateId();
    this.name = 'Database Error';
    this.message = message;
  }
}
