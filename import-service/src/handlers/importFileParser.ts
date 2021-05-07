import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import AWS from 'aws-sdk';

const BUCKET = process.env.BUCKET_NAME;

export const importFileParser: APIGatewayProxyHandler = async (event) => {
  console.log('importFileParser lambda invocation with event:', event);
  
  return {

  }
};