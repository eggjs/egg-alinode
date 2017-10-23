'use strict';

const assert = require('assert');
const AlinodeAgent = require('agentx');
const homedir = require('node-homedir');
const fs = require('fs');
const path = require('path');

module.exports = agent => {
  const config = agent.config.alinode;
  if (!config.enable) {
    agent.coreLogger.info('[egg-alinode] disable');
    return;
  }
  assert(config.appid, 'config.alinode.appid required');
  assert(config.secret, 'config.alinode.secret required');

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
