'use strict';

exports.logger = {
  consoleLevel: 'error',
};

exports.alinode = {
  appid: process.env.ALINODE_APPID,
  secret: process.env.ALINODE_SECRET,
};

if (process.env.ALINODE_SERVER) {
  exports.alinode.server = process.env.ALINODE_SERVER;
}

exports.keys = 'foo';
