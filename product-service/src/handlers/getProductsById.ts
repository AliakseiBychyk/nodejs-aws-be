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
      body: JSON.stringify(product)
    }
    : {
      statusCode: 404
    };
};
