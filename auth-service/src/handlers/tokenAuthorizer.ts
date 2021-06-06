import 'source-map-support/register';
import { ProxyHandler } from 'aws-lambda';

export const tokenAuthorizer: ProxyHandler = async (event, ctx, cb) => {
  console.log('tokenAuthorizer lambda invocation with event:', event);

  if (event['type'] !== 'TOKEN') cb('Unauthorized');

  try {
    const token = event.authorizationToken;

    const encodedCreds = token.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const plainCreds = buff.toString('utf-8').split(':');

    const username = plainCreds[0];
    const password = plainCreds[1];

  } catch(e) {

  }

  return {
    statusCode: 200
  }
}