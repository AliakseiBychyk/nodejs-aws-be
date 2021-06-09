import 'source-map-support/register';
import { APIGatewayAuthorizerEvent, PolicyDocument } from 'aws-lambda';

export default class AuthService {


  getPolicyDocument = (effect: string, resource: string): PolicyDocument => {
    return {
      Version: '2012-10-17',
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      }]
    };
  }

  getToken = (event: APIGatewayAuthorizerEvent): string => {
    if (!event.type || event.type !== 'TOKEN') {
      throw new Error('Expected "event.type" parameter to have value "TOKEN"');
    }

    const tokenString = event.authorizationToken;
    if (!tokenString) {
      throw new Error('Expected "event.authorizationToken" parameter to be set');
    }

    const match = tokenString.match(/^Basic (.*)$/);
    if (!match || match.length < 2) {
      throw new Error(`Invalid Authorization token - ${tokenString} does not match "Basic .*"`)
    }

    return match[1];
  }

  authenticate = (event: APIGatewayAuthorizerEvent) => {
    const token = this.getToken(event);
    const buff = Buffer.from(token, 'base64');
    const plainCreds = buff.toString('utf-8').split(':');

    const username = plainCreds[0];
    const password = plainCreds[1];

    console.log(`username: ${username} and password: ${password}`);
    const storedUserPassword = process.env[username]

  }
}