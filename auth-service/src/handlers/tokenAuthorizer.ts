import 'source-map-support/register';
import { APIGatewayAuthorizerEvent, Context, Callback, APIGatewayAuthorizerHandler } from 'aws-lambda';
import AuthService from ',/auth.service';

export const tokenAuthorizer: APIGatewayAuthorizerHandler = async (event: APIGatewayAuthorizerEvent, ctx: Context, cb: Callback) => {
  console.log('tokenAuthorizer lambda invocation with event:', event);

  if (event['type'] !== 'TOKEN') cb('Unauthorized');

  try {
    const token = event.authorizationToken;

    const encodedCreds = token.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const plainCreds = buff.toString('utf-8').split(':');

    const username = plainCreds[0];
    const password = plainCreds[1];

    console.log(`username: ${username} and password: ${password}`);

    const storedUserPassword = process.env[username]
    
    cb(null, policy)
  } catch(e) {
    cb(`Unauthorized: ${e.message}`);
  }

  return {
    statusCode: 200
  }
}