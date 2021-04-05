import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const getShopInfo: APIGatewayProxyHandler = async (event) => {
  console.log('lambda invocation with event:', event);

  return {
    statusCode: 200,
    body: JSON.stringify({
      shopName: 'The best old warbirds',
      workingHours: '24/7',
    }),
  };
};