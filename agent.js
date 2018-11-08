'use strict';

const AlinodeAgent = require('agentx');
const homedir = require('node-homedir');
const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports = agent => {
  const config = agent.config.alinode;
  const platform = (os.platform() || '').toLowerCase();
  if (!config.enable) {
    agent.coreLogger.info('[egg-alinode] disable');
    return;
  }
  if (!config.appid || !config.secret) {
    agent.coreLogger.info('[egg-alinode] config.alinode.appid && config.alinode.secret required');
    return;
  }
  if (platform === 'win32') {
    agent.coreLogger.info('[egg-alinode] alinode does not support windows for the time being.');
    return;
  }

  const nodepathFile = path.join(homedir(), '.nodepath');
  const nodeBin = path.dirname(process.execPath);
  fs.writeFileSync(nodepathFile, nodeBin);

  config.logger = agent.coreLogger;
  config.libMode = true;
  new AlinodeAgent(config).run();
  agent.coreLogger.info('[egg-alinode] alinode agentx started, node versions: %j, update %s with %j, config: %j',
    process.versions,
    nodepathFile,
    nodeBin,
    {
      server: config.server,
      appid: config.appid,
    }
  );
};
