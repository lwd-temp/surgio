// istanbul ignore file

import { createLogger } from '@surgio/logger';

import { isGFWFree } from './';

const logger = createLogger({ service: 'surgio:utils:patch-proxy' });
const keys: ReadonlyArray<string> = ['http_proxy', 'https_proxy', 'all_proxy'];

if (!isGFWFree()) {
  process.env.GLOBAL_AGENT_ENVIRONMENT_VARIABLE_NAMESPACE = '';

  keys.forEach((key) => {
    if (key in process.env) {
      const newKey = key.toUpperCase();
      const value = process.env[key];

      logger.debug('patched environment variable %s=%s', newKey, value);
      process.env[newKey] = value;
    }
  });
}