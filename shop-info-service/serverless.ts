import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';

const region = 'eu-west-1';

const serverlessConfiguration: AWS = {
  service: 'shop-info-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region,
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: {
    hello,
    getShopInfo: {
      handler: 'handler.getShopInfo',
      events: [{ http: { method: 'GET', path: 'shop-info' } }],
    },  
    getShopAdminInfo: {
      handler: 'handler.getShopAdminInfo',
      events: [{ http: { method: 'GET', path: 'shop-admin-info' } }],
    },
  },
};

module.exports = serverlessConfiguration;
