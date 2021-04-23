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
  }

  public async executeQuery(query: string) {
    this.client.connect();
    try { 
      this.result = await this.client.query(query);
      await this.client.end()
      
      return this.result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
};

export default new dbService();