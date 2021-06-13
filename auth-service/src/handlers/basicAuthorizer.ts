import 'source-map-support/register';
import {
  APIGatewayTokenAuthorizerEvent,
  Context,
  Callback,
  APIGatewayAuthorizerHandler,
  APIGatewayAuthorizerResult,
} from 'aws-lambda';

export const basicAuthorizer: APIGatewayAuthorizerHandler = async (
  event: APIGatewayTokenAuthorizerEvent,
  _ctx: Context,
  cb: Callback,
) => {
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
    const effect = !storedUserPassword || storedUserPassword != password ? 'Deny' : 'Allow';


    const policy = generatePolicy(encodedCreds, event.methodArn, effect);
    
    cb(null, policy)
  } catch (e) {
    cb(`Unauthorized: ${e.message}`);
  }
};

const generatePolicy = (principalId: string, resource: string, effect = 'Allow'): APIGatewayAuthorizerResult => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    }
  };
}