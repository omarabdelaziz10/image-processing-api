import express from 'express';
import imageResizeRouter from './api/imageResizeRouter';

const routes = express.Router();
routes.use('/imageResize', imageResizeRouter);

export default routes;
