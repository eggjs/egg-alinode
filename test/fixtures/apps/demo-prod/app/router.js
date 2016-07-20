'use strict';

module.exports = app => {
  app.get('/', function* () {
    this.body = `hello alinode, enable: ${this.app.config.alinode.enable}, env: ${this.app.config.env}`;
  });
};
