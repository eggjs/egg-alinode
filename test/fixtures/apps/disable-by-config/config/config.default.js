'use strict';

exports.alinode = {
  enable: false,
  appid: process.env.ALINODE_APPID,
  secret: process.env.ALINODE_SECRET,
};

if (process.env.ALINODE_SERVER) {
  exports.alinode.server = process.env.ALINODE_SERVER;
}
