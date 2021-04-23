import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import dbService from '../db/db.ts';

export const getProductsList : APIGatewayProxyHandler = async(event) => {
  console.log('getProductsList lambda invocation with event:', event);

  const query = `
  SELECT products.*, stock.count
  FROM products
  LEFT JOIN stock ON products.id = stock.product_id
  `;
  const products = await dbService(query);
  console.log('products reseived from db: ', products);

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
