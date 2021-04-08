import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import products from './productsList.json';

export const getProductsList: APIGatewayProxyHandler = async (event) => {
  console.log('getProductsList lambda invocation with event:', event);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(products)
  };
};