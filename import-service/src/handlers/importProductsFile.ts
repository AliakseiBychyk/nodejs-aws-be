import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import S3 from 'aws-sdk/clients/s3';

const BUCKET = process.env.BUCKET_NAME;

export const importProductsFile: APIGatewayProxyHandler = async (event) => {
  console.log('importProductsFiles lambda invocation with event:', event);
  
  const s3 = new S3({ region: 'eu-west-1' });
  
  const { name: fileName } = event.queryStringParameters;
  
  const filePath = `uploaded/${fileName}.csv`;

  const params = {
    Bucket: BUCKET,
    Key: filePath,
    Expires: 60,
    ContentType: 'text/csv',
  };

  let signedUrl;

  try {
    signedUrl = await s3.getSignedUrlPromise('putObject', params);
    
    console.log(`Signed url for ${fileName} is ${signedUrl}`)
   } catch (error) {
    
    throw error;
  }

  return signedUrl;
}