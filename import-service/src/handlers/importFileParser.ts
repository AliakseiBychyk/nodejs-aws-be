import { S3Handler } from 'aws-lambda';
import 'source-map-support/register';
// import S3 from 'aws-sdk/clients/s3';


// const BUCKET = process.env.BUCKET_NAME;

export const importFileParser: S3Handler = async (event) => {
  console.log('importFileParser lambda invocation with event:', event);
  console.log('triggered records', event.Records)
  
  // const s3 = new S3({
  //   region: 'eu-west-1',
  //   signatureVersion: 'v4',
  // });

  // const params = {
  //   Bucket: BUCKET,
  //   Key: ''
  // };

  return {
    statusCode: 202
  }
};