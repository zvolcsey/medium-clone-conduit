import express from 'express';
import * as tagsControllers from '../../controller/tags.controller';

const tagsRoutes = express.Router();

// desc    Get Tags
// route   GET /api/tags
tagsRoutes.get('/tags', tagsControllers.getPopularTagsHandler);

export default tagsRoutes;
