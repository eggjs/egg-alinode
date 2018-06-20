'use strict';

const request = require('supertest');
const mm = require('egg-mock');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const moment = require('moment');
const assert = require('assert');

describe('test/plugin.test.js', () => {
  afterEach(mm.restore);

  describe('config.alinode.enable = true', () => {
    let app;
    const schedule = path.join(__dirname, '../app/schedule/removeLogs');
    const now = moment().startOf('date');

    before(() => {
      app = mm.app({
        baseDir: 'apps/demo',
        customEgg: require.resolve('egg'),
      });
      return app.ready();
    });

    after(() => app.close());

    afterEach(mm.restore);

    it('should alinode enable', () => {
      return request(app.callback())
        .get('/')
        .expect('hello alinode, enable: true, env: unittest')
        .expect(200);
    });

    it('should remove old log files', function* () {
      fs.writeFileSync(path.join(app.config.alinode.logdir, 'foo-00000000.log'), 'foo');
      fs.writeFileSync(path.join(app.config.alinode.logdir, 'node-00000000.log'), 'foo');
      fs.writeFileSync(path.join(app.config.alinode.logdir,
        `foo-${now.format('YYYYMMDD')}.log`), 'foo');
      fs.writeFileSync(path.join(app.config.alinode.logdir,
        `node-${now.format('YYYYMMDD')}.log`), 'foo');
      fs.writeFileSync(path.join(app.config.alinode.logdir,
        `access-${now.format('YYYYMMDD')}.log`), 'foo');
      fs.writeFileSync(path.join(app.config.alinode.logdir,
        `node-${now.clone().subtract(1, 'days').format('YYYYMMDD')}.log`), 'foo');
      fs.writeFileSync(path.join(app.config.alinode.logdir,
        `node-${now.clone().subtract(5, 'days').format('YYYYMMDD')}.log`), 'foo');
      fs.writeFileSync(path.join(app.config.alinode.logdir,
        `node-${now.clone().subtract(6, 'days').format('YYYYMMDD')}.log`), 'foo');
      fs.writeFileSync(path.join(app.config.alinode.logdir,
        `node-${now.clone().subtract(7, 'days').format('YYYYMMDD')}.log`), 'foo');
      fs.writeFileSync(path.join(app.config.alinode.logdir,
        `node-${now.clone().subtract(8, 'days').format('YYYYMMDD')}.log`), 'foo');
      fs.writeFileSync(path.join(app.config.alinode.logdir,
        `node-${now.clone().subtract(9, 'days').format('YYYYMMDD')}.log`), 'foo');
      fs.writeFileSync(path.join(app.config.alinode.logdir,
        `node-${now.clone().subtract(30, 'days').format('YYYYMMDD')}.log`), 'foo');
      fs.writeFileSync(path.join(app.config.alinode.logdir,
        `access-${now.clone().subtract(6, 'months').format('YYYYMMDD')}.log`), 'foo');
      fs.writeFileSync(path.join(app.config.alinode.logdir,
        `access-${now.clone().subtract(1, 'years').format('YYYYMMDD')}.log`), 'foo');

      yield app.runSchedule(schedule);

      const files = glob.sync(path.join(app.config.alinode.logdir, '*.log'));
      assert(files.length === 9);

      assert(fs.existsSync(path.join(app.config.alinode.logdir, 'foo-00000000.log')));
      assert(fs.existsSync(path.join(app.config.alinode.logdir, 'node-00000000.log')));
      assert(fs.existsSync(path.join(app.config.alinode.logdir,
        `foo-${now.format('YYYYMMDD')}.log`)));
      assert(fs.existsSync(path.join(app.config.alinode.logdir,
        `node-${now.format('YYYYMMDD')}.log`)));
      assert(fs.existsSync(path.join(app.config.alinode.logdir,
        `access-${now.format('YYYYMMDD')}.log`)));
      assert(fs.existsSync(path.join(app.config.alinode.logdir,
        `node-${now.clone().subtract(1, 'days').format('YYYYMMDD')}.log`)));
      assert(fs.existsSync(path.join(app.config.alinode.logdir,
        `node-${now.clone().subtract(5, 'days').format('YYYYMMDD')}.log`)));
      assert(fs.existsSync(path.join(app.config.alinode.logdir,
        `node-${now.clone().subtract(6, 'days').format('YYYYMMDD')}.log`)));
      assert(fs.existsSync(path.join(app.config.alinode.logdir,
        `node-${now.clone().subtract(7, 'days').format('YYYYMMDD')}.log`)));

      assert(!fs.existsSync(path.join(app.config.alinode.logdir,
        `node-${now.clone().subtract(8, 'days').format('YYYYMMDD')}.log`)));
      assert(!fs.existsSync(path.join(app.config.alinode.logdir,
        `node-${now.clone().subtract(9, 'days').format('YYYYMMDD')}.log`)));
      assert(!fs.existsSync(path.join(app.config.alinode.logdir,
        `node-${now.clone().subtract(30, 'days').format('YYYYMMDD')}.log`)));
      assert(!fs.existsSync(path.join(app.config.alinode.logdir,
        `access-${now.clone().subtract(6, 'months').format('YYYYMMDD')}.log`)));
      assert(!fs.existsSync(path.join(app.config.alinode.logdir,
        `access-${now.clone().subtract(1, 'years').format('YYYYMMDD')}.log`)));

      // run again should work
      yield app.runSchedule(schedule);
    });
  });

  describe('config.alinode.enable = false', () => {
    let app;
    before(() => {
      app = mm.app({
        baseDir: 'apps/disable-by-config',
        customEgg: require.resolve('egg'),
      });
      return app.ready();
    });

    after(() => app.close());

    afterEach(mm.restore);

    it('should alinode disable', () => {
      return request(app.callback())
        .get('/')
        .expect('hello alinode, enable: false')
        .expect(200);
    });
  });

  describe('mock prod env', () => {
    let app;
    before(() => {
      mm.env('prod');
      mm(process.env, 'NODE_LOG_DIR', path.join(__dirname, 'fixtures/apps/demo-prod/logs/alinode'));
      app = mm.app({
        baseDir: 'apps/demo-prod',
        cache: false,
        customEgg: require.resolve('egg'),
      });
      return app.ready();
    });

    after(() => app.close());

    afterEach(mm.restore);

    it('should alinode enable', () => {
      return request(app.callback())
        .get('/')
        .expect('hello alinode, enable: true, env: prod')
        .expect(200);
    });
  });
});
