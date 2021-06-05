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

  public async executeQuery(query: string): Promise<IProduct[]> {   
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

    console.log('this.result:: ', this.result)

    return this.result;
  };

  public async getProductById(id: string): Promise<IProduct[]> {
    const query = `
    SELECT *, stock.count
      FROM products
      LEFT JOIN stock ON products.id = stock.product_id
      WHERE id = '${id}';
    `;
    return await this.executeQuery(query);
  }

  public async getProducts(): Promise<IProduct[]> {
    const query = `
    SELECT *, stock.count
      FROM products
      LEFT JOIN stock ON products.id = stock.product_id;
    `;
    return await this.executeQuery(query);
  }

  public async createProduct(title: string, description: string, price: number, image: string): Promise<Partial<IProduct>[]> {
    const query = `
    INSERT INTO products (title, description, price, image)
      values('${title}', '${description}', ${price}, '${image}')
    `;
    console.log(query);
    return await this.executeQuery(query);
  }

};

export default new dbService();