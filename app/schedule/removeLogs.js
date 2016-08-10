'use strict';

const path = require('path');
const fs = require('mz/fs');
const moment = require('moment');

module.exports = app => {
  const exports = {};

  const logger = app.coreLogger;

  exports.schedule = {
    type: 'worker', // only one worker run this task
    cron: '0 0 * * *', // run every day at 00:00
  };
  exports.task = function* () {
    const logdir = app.config.alinode.logdir;
    const maxDays = 7;
    try {
      yield removeExpiredLogFiles(logdir, maxDays);
    } catch (err) {
      logger.error(err);
    }
  };

  // remove expired log files: [access|node]-YYYYMMDD.log
  function* removeExpiredLogFiles(logdir, maxDays) {
    const files = yield fs.readdir(logdir);
    const expriedDate = moment().subtract(maxDays, 'days').startOf('date');
    const names = files.filter(name => {
      const m = /^(?:access|node)\-(\d{8})\.log$/.exec(name);
      if (!m) {
        return false;
      }
      const date = moment(m[1], 'YYYYMMDD').startOf('date');
      if (!date.isValid()) {
        return false;
      }
      return date.isBefore(expriedDate);
    });
    if (names.length === 0) {
      return;
    }

    logger.info(`[egg-alinode] start remove ${logdir} files: ${names.join(', ')}`);
    yield names.map(name => function* () {
      const logfile = path.join(logdir, name);
      try {
        yield fs.unlink(logfile);
      } catch (err) {
        err.message = `[egg-alinode] remove logfile ${logfile} error, ${err.message}`;
        logger.error(err);
      }
    });
  }

  return exports;
};
