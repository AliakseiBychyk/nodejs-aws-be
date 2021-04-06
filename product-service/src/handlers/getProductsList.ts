import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import products from './productsList.json';

export const getProductsList: APIGatewayProxyHandler = async (event) => {
  console.log('getProductsList lambda invocation with event:', event);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'd1e6ot7uwpnguw.cloudfront.net'
    },
    body: JSON.stringify(products)
  };
};
