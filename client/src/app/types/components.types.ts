export type ButtonType = 'button' | 'submit' | 'reset' | undefined;

export interface ArticleMetaData {
  authorUsername: string;
  following: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
  resourceId: string;
  favorited: boolean;
  favoritesCount: number;
}
