import stream from 'stream';
import { S3Handler } from 'aws-lambda';
import 'source-map-support/register';
import S3 from 'aws-sdk/clients/s3';
import csv from 'csv-parser';


const BUCKET = process.env.BUCKET_NAME;

const s3 = new S3({
  region: 'eu-west-1',
  signatureVersion: 'v4',
});

const createObjectToJsonLineStream = () => (
  new stream.Transform({
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
      const line = `${JSON.stringify(chunk)}\n`;
      callback(null, line);
    }
  })
);

export const importFileParser: S3Handler = async (event) => {
  console.log('importFileParser lambda invocation with event:', event);
  console.log('existing object::', event.Records[0].s3.object)

  const uploadedFilesPromises = event.Records.map(record => (
    new Promise((resolve, reject) => {
      const params: S3.Types.GetObjectRequest = {
        Bucket: BUCKET,
        Key: record.s3.object.key,
      };

      let pipeline = s3.getObject(params)
        .createReadStream()
        .on('error', err => reject(err))
        .pipe(csv())
        .pipe(createObjectToJsonLineStream());

      const outputParams: S3.Types.PutObjectRequest = {
        Bucket: BUCKET,
        Key: record.s3.object.key
          .replace('.csv', '.json')
          .replace('uploaded', 'parsed')
      };
      outputParams.Body= pipeline;
      console.log('outputParams', outputParams);

      s3.upload(outputParams)
        .send((err, data)=> {
          if (err) reject(err);
          resolve(data);
        })      
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