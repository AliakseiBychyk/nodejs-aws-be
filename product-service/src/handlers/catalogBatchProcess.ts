import { SQSHandler } from 'aws-lambda';
import { SNS } from 'aws-sdk';
import 'source-map-support/register';
import dbService from '../db';

const { SNS_TOPIC_ARN } = process.env;
const sns = new SNS({ region: 'eu-west-1' });

export const catalogBatchProcess: SQSHandler = async (event) => {
  console.log('catalogBatchProcess lambda invocation with event:', event);

  const createNewProducts = async (event) => {
    for (const record of event.Records) {
      const { description, price, title, image } = JSON.parse(record.body);
      try {
        await dbService.createProduct(title, description, Number(price), image);
        await sns.publish({
          Subject: 'Product created',
          Message: `Product created: \n${record.body}`,
          TopicArn: SNS_TOPIC_ARN
        }).promise();
      } catch(e) {
        console.error('Failure occured', e);
        throw e;
      } 
    }
    return {
      statusCode: 202
    }
  }

  await createNewProducts(event);

  return {
    statusCode: 200
  }
};
