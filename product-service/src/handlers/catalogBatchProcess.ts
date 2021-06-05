import { SQSHandler } from 'aws-lambda';
import 'source-map-support/register';
import dbService from '../db';

export const catalogBatchProcess: SQSHandler = async (event) => {
  console.log('catalogBatchProcess lambda invocation with event:', event);

  const createNewProducts = async (event) => {
    for (const record of event.Records) {
      const { description, price, title, image } = JSON.parse(record.body);
      
      await dbService.createProduct(title, description, Number(price), image);
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
