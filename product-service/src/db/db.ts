// import { Client } from 'pg';
const { Client } = require('pg');
import config from './config';

const { database: dbConfig } = config;

const dbService = async (query) => {
  console.log('dbService is invoked with query:', query);
  console.log('db config: ', dbConfig)

  const client = new Client(dbConfig);

  await client.connect()
  
  try {
    const { rows: result } = await client.query(query);
    console.log('result::', result)
    client.end();
    return result;
  } catch (err) {
    console.error('Error during executing db request', err);
    throw err;
  }

}

export default dbService;