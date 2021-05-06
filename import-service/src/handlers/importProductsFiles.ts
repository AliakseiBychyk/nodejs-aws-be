import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import AWS from 'aws-sdk';

const BUCKET = process.env.BUCKET_NAME;

export const importProductsFiles: APIGatewayProxyHandler = async (event) => {
  console.log('importProductsFiles lambda invocation with event:', event);

  const s3 = new AWS.S3({ region: 'eu-west-1' });
  let statusCode = 200;
  let thumbnails = [];
  const params = {
    Bucket: BUCKET,
    Prefix: 'thumbnails/',
  };

  try {
    const s3Response = await s3.listObjectsV2(params).promise();
    thumbnails = s3Response.Contents;
  } catch (error) {
    console.error(error);
    statusCode = 500;
  }

  const response = {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(
      thumbnails
        .filter(thumbnail => thumbnail.Size)
        .map(thumbnail => `https://${BUCKET}.s3.amazonaws.com/${thumbnail.Key}`)
    )
  };

  return response;
}