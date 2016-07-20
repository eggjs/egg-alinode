'use strict';

module.exports = {
  write: true,
  prefix: '^',
   test: [
     'test',
     'benchmark',
   ],
  dep: [
    'commandx'
  ],
  devdep: [
    'egg-bin',
    'autod',
    'eslint',
    'eslint-config-egg',
    'supertest'
  ],
  exclude: [
    './test/fixtures',
  ],
}
