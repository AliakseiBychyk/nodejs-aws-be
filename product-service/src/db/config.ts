const {
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USERNAME,
  PG_PASSWORD
} = process.env;

export default {
  database: {
    host: PG_HOST,
    port: Number.parseInt(PG_PORT, 10),
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
      rejectUnauthorized: false,
    },
    connectTimeoutMillis: 5000,
  },
};