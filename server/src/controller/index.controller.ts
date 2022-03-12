import { Response } from 'express';

export const getApi = (res: Response) => {
  res.json({
    message: 'Welcome to the API',
  });
};
