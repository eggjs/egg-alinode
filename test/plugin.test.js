'use strict';

const request = require('supertest-as-promised');
const mm = require('egg-mock');
const path = require('path');

describe('test/plugin.test.js', () => {
  afterEach(mm.restore);

  describe('config.alinode.enable = true', () => {
    let app;
    before(() => {
      app = mm.app({
        baseDir: 'apps/demo',
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
  });

  describe('config.alinode.enable = false', () => {
    let app;
    before(() => {
      app = mm.app({
        baseDir: 'apps/disable-by-config',
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
