'use strict';

exports.keys = 'foo';

exports.alinode = {
  enable: false,
  appid: '189',
  secret: '0d9701851077f3b378b06b719b511e5ae3c67aee',
};

if (process.env.ALINODE_SERVER) {
  exports.alinode.server = process.env.ALINODE_SERVER;
}
