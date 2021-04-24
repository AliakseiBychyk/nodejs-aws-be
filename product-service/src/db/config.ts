const {
  PG_HOST,
  PG_DATABASE,
  PG_USERNAME,
  PG_PASSWORD
} = process.env;

export default {
  database: {
    host: PG_HOST,
    port: 5432,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
      rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 5000,
  },
};