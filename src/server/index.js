import controllers from './controllers';
import contentTypes from './content-types';
import services from './services';
import routes from './routes';

const server = () => ({
  contentTypes,
  services,
  controllers,
  routes,
});

module.exports = server;
