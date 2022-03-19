import { ErrorResBody } from '../../../../server/src/types/appResponse.types';

export interface CommonState {
  appName: string;
  appSlogan: string;
}

export interface PopularTagsState {
  tags: string[];
  status: 'idle' | 'loading' | 'success' | 'failed';
}
