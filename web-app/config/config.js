var path = require('path'),
    development = require('./development'),
    test = require('./test'),
    production = require('./production'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

development.root = rootPath;
test.root = rootPath;
production.root = rootPath;

var config = {
  development: development,
  test: test,
  production: production
};

module.exports = config[env];
