import { S3Handler } from 'aws-lambda';
import 'source-map-support/register';
import S3 from 'aws-sdk/clients/s3';
import csv from 'csv-parser';


const BUCKET = process.env.BUCKET_NAME;

const s3 = new S3({
  region: 'eu-west-1',
  signatureVersion: 'v4',
});

export const importFileParser: S3Handler = async (event) => {
  console.log('importFileParser lambda invocation with event:', event);
  console.log('existing object::', event.Records[0].s3.object)

  const results = [];

  const uploadedFilesPromises = event.Records.map(record => (
    new Promise(resolve => {
      const params: S3.Types.GetObjectRequest = {
        Bucket: BUCKET,
        Key: record.s3.object.key,
      };

      const s3Stream = s3.getObject(params).createReadStream();
      const writeJson = async (params) => {
        return await s3.putObject(params).promise();
      };

      s3Stream
        .pipe(csv())
        .on('data', (data) => {
          console.log('data from stream:', data);
          const parsedFile = record.s3.object.key.replace('.csv', '.json');
          writeJson({ Bucket: BUCKET, Key: `parsed/${parsedFile}`, Body: JSON.stringify(data) });
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
    const results = await Promise.all(uploadedFilesPromises);
    console.log('final results:', results)

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