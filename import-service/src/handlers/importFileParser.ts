import { S3Handler } from 'aws-lambda';
import 'source-map-support/register';
import AWS from 'aws-sdk';
import csv from 'csv-parser';


const { BUCKET_NAME: BUCKET, SQS_URL } = process.env;

AWS.config.update({ region: 'eu-west-1' });

const s3 = new AWS.S3({ signatureVersion: 'v4' });
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });


export const importFileParser: S3Handler = async (event) => {
  console.log('importFileParser lambda invocation with event:', event);

  const moveProcessedFiles = async (event) => {
    
    for (const record of event.Records) {

      await s3.copyObject({
        Bucket: BUCKET,
        CopySource: BUCKET + '/' + record.s3.object.key,
        Key: record.s3.object.key.replace('uploaded', 'processed')
      }).promise();
      
      await s3.deleteObject({
        Bucket: BUCKET,
        Key: record.s3.object.key
      }).promise();

      console.log(`Object from ${record.s3.object.key} moved to ${record.s3.object.key.replace('uploaded', 'processed')} `)
    }

    return {
      statusCode: 202
    };
  };

  const results = [];

  const uploadedFilesPromises = event.Records.map(record => (
    new Promise(resolve => {
      const params: AWS.S3.Types.GetObjectRequest = {
        Bucket: BUCKET,
        Key: record.s3.object.key,
      };

      const s3Stream = s3.getObject(params).createReadStream();

      s3Stream
        .pipe(csv())
        .on('data', async (data) => {
          console.log('data from stream:', data);
          results.push(data);
        })
        .on('error', (error) => {
          console.error('something went wrong:', error.message);
          throw error;
        })
        .on('end', () => {
          console.log('results:', results);
          
          resolve(results);
        });
      
    })
  ));

  try {
    const [ result ] = await Promise.all(uploadedFilesPromises) as Array<any>;
    console.log('Parsed result: ', result);

    result.forEach(product => {
      console.log('product: ', JSON.stringify(product));

      sqs.sendMessage({
        QueueUrl: SQS_URL,
        MessageBody: JSON.stringify(product)
      }).promise()
        .then(() => {
          console.log('Send message for: ', product)
        })
        .catch((err) => {
          console.log('Error when send to sqs: ', err)
        });
    })

    await moveProcessedFiles(event);

    return {
      statusCode: 202,
      message: 'CSV files successfully parsed!',
    }
  } catch (error) {
    console.error('something went wrong:', error.message);
          
    return {
      statusCode: error.statusCode,
      message: error.message,
    }
  }
};