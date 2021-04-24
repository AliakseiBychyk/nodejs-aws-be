import { Client, ClientConfig } from 'pg';
import { IProduct } from '../models/product';
import config from './config';

const { database: dbConfig }: { database: ClientConfig } = config;
class dbService {
  private client: Client;
  private result: IProduct[] | null;

  constructor() {
    this.result = null;
    console.log('db config: ', dbConfig)
  }

  public async executeQuery(query: string) {   
    this.client = new Client(dbConfig);

    await this.client.connect();
    try { 
      const { rows } = await this.client.query(query);
      console.log('received rows:', rows)
      this.result = rows;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      this.client.end();
      console.log('connection closed');
    }

    return this.result;
  };
};

export default new dbService();