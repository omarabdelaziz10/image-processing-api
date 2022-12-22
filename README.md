# image-processing-api
image processing api for udacity nanodegree
this is an express api that can take an image, height and width and resize the image

#### Create Resized image

```http
  GET /api/imageResize/?filename={filename}&height={height}&width={width}
```
**Note: _Width_ and _Height_ is Optional**
 ## Scripts

Run prettier

```bash
  npm run prettier
```

Run Lint

```bash
  npm run lint
```

Run tests

```bash
  npm run test
```

Start the local server

```bash
  npm run start
```

Build the project

```bash
  npm run build
```

Start the production server

```bash
  npm run start:prod
```

## Test The API

```http
  GET /api/imageResize/?filename=icelandwaterfall&height=540&width=600
```