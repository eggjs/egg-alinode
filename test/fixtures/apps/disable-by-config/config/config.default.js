'use strict';

exports.alinode = {
  enable: false,
  appid: '2897',
  secret: 'a50cab5a09d77441255f9e27bbf74ae1612221a5',
};

if (process.env.ALINODE_SERVER) {
  exports.alinode.server = process.env.ALINODE_SERVER;
}
