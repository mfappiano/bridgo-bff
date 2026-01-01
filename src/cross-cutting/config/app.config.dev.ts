import { AppConfig } from './app.config';

const config: Partial<AppConfig> = {
  newRelicLicenseKey: process.env.NEW_RELIC_LICENSE_KEY,
};

export default config;
