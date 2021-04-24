import { Client, ClientConfig } from 'pg';

import config from './config';

const { database: dbConfig }: { database: ClientConfig } = config;
class dbService {
  private client: Client;

  constructor() {
    this.client = new Client(dbConfig)
    console.log('db config: ', dbConfig)
  }

  public async executeQuery(query: string) {   
    await this.client.connect()
    try { 
      const { rows } = await this.client.query(query);
      console.log('received rows:', rows)
      return rows
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      this.client.end();
    }
  };
};

export default new dbService();