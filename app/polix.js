const app = require('./application');
const Controller = require('./core/controllers');
const Service = require('./core/services');
const log = require('./lib/log');
const pkg = require('../package.json');
const load = require('./load');
const { Get, Post } = require('./core/decorator');

function start() {
  load.load();
  log.info('start Polix ', log.color.yellow(`v${pkg.version}`));
}

module.exports = {
  Controller,
  Service,
  app,
  Get,
  Post,
  start
}
