import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import dbService from '../db';

export const getProductsById: APIGatewayProxyHandler = async (event) => {
  console.log('getProductsById lambda invocation with event:', event);
  console.log('Path Parameters:', event.pathParameters)

  const { productId } = event.pathParameters;
  console.log('product id :', productId, typeof productId)

  let product;
  try {
    product = await dbService.getProductById(productId);
  } catch (err) {
    return {
      statusCode: 500,
      message: 'Something went wrong',
    };
  }

  if (product.length === 0) {
    return { statusCode: 404, message: 'Product not found' };
  }
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(product[0])
  };
};
