export interface dbOptions {
  user: string;
  password: string;
  host: string;
  port: string;
  database: string;
}

export interface UserFromDB {
  id: string;
  created_at: string;
  updated_at: string;
  username: string;
  password: string;
  bio: string;
}

export interface ProfileFromDB {
  id: string;
  created_at: string;
  updated_at: string;
  username: string;
  password: string;
  bio: string;
  following?: boolean;
}

export interface ArticleFromDB {
  id: string;
  resource_id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  tag_list: string[];
  created_at: string;
  updated_at: string;
  favorited: boolean;
  favorites_count: string;
  author_id: string;
  username: string;
  bio: string;
  following: boolean;
}

export interface MultipleArticlesFromDB {
  articlesFromDB: ArticleFromDB[];
  articlesCount: number;
}

export interface MultipleCommentsFromDB {
  commentsFromDB: CommentFromDB[];
  commentsCount: number;
}

export interface CommentFromDB {
  id: string;
  resource_id: string;
  created_at: string;
  updated_at: string;
  body: string;
  author_id?: string;
  username: string;
  bio?: string;

  following: boolean;
}

export interface TagFromDB {
  title: string;
}

export interface Count {
  count: string;
}

export interface CountWithId extends Count {
  id: string;
}

export interface isFollowing {
  exists: boolean;
}

export interface isFavorite {
  exists: boolean;
}

export interface ResourceId {
  resource_id: string;
}
