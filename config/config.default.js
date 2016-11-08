'use strict';

const path = require('path');
const mkdirp = require('mkdirp');

module.exports = appInfo => {
  const exports = {};

  const appRoot = appInfo.env === 'local' || appInfo.env === 'unittest' ? appInfo.baseDir : appInfo.HOME;
  let alinodeLogdir = path.join(appRoot, 'logs/alinode');
  // try to use NODE_LOG_DIR first
  if (process.env.NODE_LOG_DIR) {
    alinodeLogdir = process.env.NODE_LOG_DIR;
  }
  mkdirp.sync(alinodeLogdir);

  exports.alinode = {
    enable: true,
    // default is alinode.aliyun.com
    server: '120.55.151.247:8080',
    appid: '',
    secret: '',
    cmddir: path.dirname(require.resolve('commandx/package.json')),
    logdir: alinodeLogdir,
    error_log: [
      path.join(appRoot, `logs/${appInfo.pkg.name}/common-error.log`),
      path.join(appRoot, 'logs/stderr.log'),
    ],
    packages: [
      path.join(appInfo.baseDir, 'package.json'),
    ],
    // seconds
    reconnectDelay: 10,
    heartbeatInterval: 60,
    reportInterval: 60,
  };

  return exports;
};
