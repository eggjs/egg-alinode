'use strict';

const request = require('supertest-as-promised');
const mm = require('egg-mock');

describe('test/plugin.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/demo',
    });
    return app.ready();
  });

  after(() => app.close());

  afterEach(mm.restore);

  it('should', () => {
    return request(app.callback())
    .get('/')
    .expect('hello alinode')
    .expect(200);
  });

});
