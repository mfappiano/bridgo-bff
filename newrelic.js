'use strict'
/**
 * New Relic agent configuration.
 *
 * See lib/config/default.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */

require('dotenv/config');

const newRelicConfig = {
  companyName: process.env.NR_COMPANY_NAME ?? 'ueno',
  squadName: process.env.NR_SQUAD_NAME ?? 'loans',
  appName: process.env.NR_SQUAD_NAME ?? 'bridgo-bff',
  loggingLevel: process.env.NR_LOGGING_LEVEL ?? 'info',
  licenseKey: process.env.NR_LICENSE_KEY,
};

exports.config = {
  /**
   * Array of application names.
   */
  app_name: [`${newRelicConfig.companyName}_${newRelicConfig.squadName}_${newRelicConfig.appName}[${process.env.NODE_ENV}]`],
  /**
   * Your New Relic license key.
   */
  license_key: newRelicConfig.licenseKey,
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: newRelicConfig.loggingLevel
  },
  labels: {
    company: newRelicConfig.companyName,
    squad: newRelicConfig.squadName,
    service_name: newRelicConfig.appName,
    env: process.env.NODE_ENV
  },
  rules: {
    ignore: ['^/health'],
  },
  /**
   * When true, all request headers except for those listed in attributes.exclude
   * will be captured for all traces, unless otherwise specified in a destination's
   * attributes include/exclude lists.
   */
  allow_all_headers: true,
  attributes: {
    /**
     * Prefix of attributes to exclude from all destinations. Allows * as wildcard
     * at end.
     *
     * NOTE: If excluding headers, they must be in camelCase form to be filtered.
     *
     * @name NEW_RELIC_ATTRIBUTES_EXCLUDE
     */
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*'
    ]
  }
}
