import request from 'supertest';
import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import app from '../index';
import { resizeImage } from '../utilities/imageUtilities';

describe('GET /api/imageResize', () => {
  it('responds with 400 if called without any of the following parameter (filename, width, height)', (done): void => {
    request(app).get('/api/imageResize').expect(400, done());
  });

  it('responds with 400 if called correctly but image does not exist', (done): void => {
    request(app).get('/api/imageResize?filename=test').expect(400, done());
  });

  it('responds with 200 if called correctly and image exist', (done): void => {
    request(app)
      .get('/api/imageResize?filename=icelandwaterfall&height=500&width=600')
      .expect(200, done());
  });

  it('created a resized version of the image', (done): void => {
    request(app)
      .get('/api/imageResize?filename=icelandwaterfall&height=300&width=250')
      .then(() => {
        const resizedFile = fs.existsSync(
          path.resolve(
            __dirname,
            '../resized-images/icelandwaterfall-250x300.jpg'
          )
        );
        expect(resizedFile).toBeTruthy();
        done();
      });
  });

  it('created a resized version of the image with the correct height and width', (done): void => {
    request(app)
      .get('/api/imageResize?filename=icelandwaterfall&height=500&width=400')
      .then(() => {
        const dimensions = sizeOf(
          path.resolve(
            __dirname,
            '../resized-images/icelandwaterfall-400x500.jpg'
          )
        );
        expect(dimensions.height).toEqual(500);
        expect(dimensions.width).toEqual(400);
        done();
      });
  });
});

describe('The resizeImage function', (): void => {
  const fullImagePath = path.resolve(__dirname, '../images/fjord.jpg');
  const resizedImagePath = path.resolve(
    __dirname,
    '../resized-images/fjord-100x100.jpg'
  );
  it('expect the function to be resolved when enter the right parameter and create the image', async (): Promise<void> => {
    await expectAsync(
      resizeImage({
        fullImagePath,
        resizedImagePath,
        width: 100,
        height: 100
      })
    ).toBeResolved();
  });
  it('expect the function to be rejected when enter the wrong parameter', async (): Promise<void> => {
    await expectAsync(
      resizeImage({
        fullImagePath: '',
        resizedImagePath,
        width: 100,
        height: 100
      })
    ).toBeRejected();
  });
});
