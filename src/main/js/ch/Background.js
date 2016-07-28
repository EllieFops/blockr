"use strict";

chrome.runtime.onInstalled.addListener(() => {
  const { migrate } = require("../Migration");
  const { version } = require('./Env').meta;

  migrate(version);
});
