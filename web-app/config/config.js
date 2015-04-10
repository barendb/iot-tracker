var path = require('path'),
    development = require('./development'),
    test = require('./test'),
    production = require('./production'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

development.rootPath = rootPath;
test.rootPath = rootPath;
production.rootPath = rootPath;

var config = {
  development: development,
  test: test,
  production: production
};

module.exports = config[env];
