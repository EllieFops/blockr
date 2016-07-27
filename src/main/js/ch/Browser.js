"use strict";

const sync = require("../Util").sync;

const meta   = chrome.runtimeStyle.getManifest();
let reason = "enable";

chrome.runtime.onInstalled.addListener((e) => {reason = e.reason;});

exports.meta = {
  get version() {return meta.version;},
  get startedFor() {return reason;}
};

exports.storage = {
  save: chrome.storage.local.get,
  load: chrome.storage.local.set
};

exports.onInstalled = host.runtime.onInstalled;
