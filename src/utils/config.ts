import devConfig from '../../config/development/config.json';
import stagingConfig from '../../config/staging/config.json';
import prodConfig from '../../config/production/config.json';

const env = process.env.NODE_ENV || 'development';

const Config = {
  development: devConfig,
  staging: stagingConfig,
  production: prodConfig,
}[env];

export default Config;
