# egg-alinode

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-alinode.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-alinode
[travis-image]: https://img.shields.io/travis/eggjs/egg-alinode.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-alinode
[codecov-image]: https://codecov.io/github/eggjs/egg-alinode/coverage.svg?branch=master
[codecov-url]: https://codecov.io/github/eggjs/egg-alinode?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-alinode.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-alinode
[snyk-image]: https://snyk.io/test/npm/egg-alinode/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-alinode
[download-image]: https://img.shields.io/npm/dm/egg-alinode.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-alinode

alinode plugin for egg.

## Install

```bash
$ npm i egg-alinode
```

## Usage

Enable this plugin

```js
// config/plugin.js
exports.alinode = true;
```

Add `appid` and `secret` from http://alinode.aliyun.com/

```js
// config/config.default.js
exports.alinode = {
  enable: true,
  appid: 'my app id',
  secret: 'my app secret',
};
```

Start dispatch.js with `NODE_LOG_DIR={logdir}` and `ENABLE_NODE_LOG=yes` env:

```bash
$ ENABLE_NODE_LOG=yes NODE_LOG_DIR=/mylogdir/ alinode dispatch.js
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
