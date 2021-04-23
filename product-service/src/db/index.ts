import { Client, ClientConfig, QueryResult } from 'pg';
import config from './config';

const { database: dbConfig }: { database: ClientConfig } = config;
class dbService {
  private client: Client;
  public result: QueryResult;

  constructor() {
    this.client = new Client(dbConfig)
  }

  public async executeQuery(query: string) {   
    await this.client.connect()
    
    try { 
      this.result = await this.client.query(query);

      return this.result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      this.client.end();
    }
  };
};

export default new dbService();