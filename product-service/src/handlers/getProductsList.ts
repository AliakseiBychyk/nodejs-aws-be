import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import dbService from '../db';

export const getProductsList : APIGatewayProxyHandler = async(event) => {
  console.log('getProductsList lambda invocation with event:', event);

  const query = `
  SELECT *, stock.count
    FROM products
    LEFT JOIN stock ON products.id = stock.product_id;
  `;

  let products;
  try { 
    products = await dbService.executeQuery(query);
  } catch (err) {
    return {
      statusCode: 500,
      message: 'Something went wrong',
    };
  }

  if (products.length === 0) {
    return { statusCode: 404, message: 'Product not found' };
  }

  console.log('products received from db: ', products);

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
