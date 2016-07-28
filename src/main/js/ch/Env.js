"use strict";

exports.meta = chrome.runtime.getManifest();

exports.storage = {
  save: v => new Promise(g => chrome.storage.local.set(v, g)),
  load: v => new Promise(g => chrome.storage.local.get(v, g)),
  drop: v => new Promise(g => chrome.storage.local.remove(v, g))
};
