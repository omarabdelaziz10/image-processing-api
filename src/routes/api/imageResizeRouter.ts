import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import {
  isImageNameFound,
  isHeightWidthValid,
  resizeImage
} from '../../utilities/imageUtilities';

const imageResizeRouter = express.Router();
imageResizeRouter.use(isImageNameFound);
imageResizeRouter.use(isHeightWidthValid);

imageResizeRouter.get(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    const filename = req.query.filename;
    const width = req.query.width ? parseInt(req.query.width as string) : null;
    const height = req.query.height
      ? parseInt(req.query.height as string)
      : null;

    const fullImagePath = path.resolve(
      __dirname,
      `../../images/${filename}.jpg`
    );
    const resizedImagePath = path.resolve(
      __dirname,
      `../../resized-images/${filename}${height || width ? '-' : ''}${
        width ? width : ''
      }${height && width ? 'x' : ''}${height ? height : ''}.jpg`
    );
    if (!height && !width) {
      res.sendFile(fullImagePath);
    } else if (fs.existsSync(resizedImagePath)) {
      res.sendFile(resizedImagePath);
    } else {
      const resizedfolderPath = path.resolve(__dirname, '../../resized-images');
      if (!fs.existsSync(resizedfolderPath)) {
        fs.mkdirSync(resizedfolderPath);
      }
      await resizeImage({
        fullImagePath,
        resizedImagePath,
        height,
        width
      });
      res.sendFile(resizedImagePath);
    }
  }
);

export default imageResizeRouter;
