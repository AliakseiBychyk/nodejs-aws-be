import { Client } from 'pg';
import config from './config';

const { database: dbConfig } = config;

const dbService = async (query) => {
  console.log('dbService is invoked with query:', query);

  const client = new Client(dbConfig);

  await client.connect()
  
  try {
    const { rows: result } = await client.query(query);
    client.end();
    return result;
  } catch (err) {
    console.error('Error during executing db request', err);
    throw err;
  }
}

export default dbService;