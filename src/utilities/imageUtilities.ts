import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDirPath = path.join(__dirname, '..', 'images');
export const isImageNameFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const myImages = fs
    .readdirSync(imagesDirPath)
    .map((file) => file.replace('.jpg', ''));
  if (req?.query?.filename && myImages.includes(req.query.filename as string)) {
    return next();
  } else {
    res
      .status(400)
      .send(
        `The URL should at least have one of the following filename as query, here is a list of them [${myImages}]`
      );
  }
};

export const isHeightWidthValid = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { height, width } = req.query;
  if (!height && !width) return next();
  const heightAsNum = parseInt(height as string);
  const widthAsNum = parseInt(width as string);
  if (heightAsNum && heightAsNum > 0 && widthAsNum && widthAsNum > 0) {
    return next();
  } else if (heightAsNum && heightAsNum > 0 && !width) {
    return next();
  } else if (widthAsNum && widthAsNum > 0 && !height) {
    return next();
  } else {
    res
      .status(400)
      .send('The height and width should be a Number bigger than 0');
  }
};

interface ResizeImageProps {
  fullImagePath: string;
  resizedImagePath: string;
  width: number | null;
  height: number | null;
}

export const resizeImage = async ({
  fullImagePath,
  resizedImagePath,
  width,
  height
}: ResizeImageProps): Promise<void> => {
  await sharp(fullImagePath).resize(width, height).toFile(resizedImagePath);
};
