export type ButtonType = 'button' | 'submit' | 'reset' | undefined;

export interface ArticleMetaData {
  authorUsername: string;
  following: boolean;
  createdAt: string;
  slug: string;
  resourceId: string;
  favoritesCount: number;
}
