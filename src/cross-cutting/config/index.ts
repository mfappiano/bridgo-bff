/* eslint-disable @typescript-eslint/no-require-imports */
import fs from 'fs';
import 'dotenv/config';
import { AppConfig } from './app.config';
import defaultConfig from './app.config.default';

const getConfiguration = () => {
  return loadConfiguration();
};

const loadConfiguration = () => {
  const env = process.env.NODE_ENV;

  if (!env) {
    throw Error('NODE_ENV NOT DEFINED IN PROCESS');
  }

  let envConfig = {};

  const fileExists = fs.existsSync(`${__dirname}/app.config.${env}`);
  if (fileExists) {
    console.log('Found configuration file for environment: ', env);
    envConfig = require(`./app.config.${env}`).default;
  }

  return { ...defaultConfig, ...envConfig } as AppConfig;
};

export default getConfiguration();
