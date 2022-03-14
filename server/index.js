const routes = require('./routes');
const services = require('./services');
const controllers = require('./controllers');
const contentTypes = require('./content-types');

module.exports = () => ({
  contentTypes,
  services,
  controllers,
  routes,
});
