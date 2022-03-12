import express from 'express';
import * as apiController from '../controller/index.controller';

const apiRoute = express.Router();

// desc    Get the Api
// route   GET /api
apiRoute.get('/api', apiController.getApi);

export default apiRoute;
