import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const importProductsFiles: APIGatewayProxyHandler = async (event) => {
  console.log('importProductsFiles lambda invocation with event:', event);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: {}
  }
}