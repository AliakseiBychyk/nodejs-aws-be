import {APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register';
import products from './productsList.json';

const {PG_HOST, PG_DATABASE, PG_USERNAME, PG_PASSWORD} = process.env;

export const getProductsList : APIGatewayProxyHandler = async(event) => {
  console.log('getProductsList lambda invocation with event:', event);

  console.log('ENV variables: ', PG_HOST, PG_PASSWORD, PG_DATABASE, PG_USERNAME);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(products)
  };
};
