import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import products from './productsList.json';

export const getProductsById: APIGatewayProxyHandler = async (event) => {
  console.log('getProductsById lambda invocation with event:', event);
  console.log('Path Parameters:', event.pathParameters)

  const { productId } = event.pathParameters;

  const product = products.find(item => item.id === productId)

  return !!product
    ? {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://d1e6ot7uwpnguw.cloudfront.net',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(product)
    }
    : {
      statusCode: 404
    };
};
