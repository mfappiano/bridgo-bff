import { AppConfig } from './app.config';

const config: Partial<AppConfig> = {
  kongUrl: process.env.KONG_URL ?? 'https://kongcloud-private.ind-stg-sae1.ueno.com.py',
  newRelicLicenseKey: process.env.NEW_RELIC_LICENSE_KEY,
};

export default config;
