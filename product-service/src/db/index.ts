import { Client, ClientConfig, QueryResult } from 'pg';

import config from './config';

interface IProduct {
  count: number;
  description: string;
  id: string;
  price: number;
  title: string;
  image: string;
}

const { database: dbConfig }: { database: ClientConfig } = config;
class dbService {
  private client: Client;
  public result: QueryResult<[IProduct]>;

  constructor() {
    this.client = new Client(dbConfig)
    console.log('db config: ', dbConfig)
  }

  public async executeQuery(query: string) {   
    await this.client.connect()
    try { 
      const { rows } = await this.client.query(query);
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