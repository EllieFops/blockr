"use strict";

exports.sync = ( func, ...args ) => {
  let value = null;
  let complete = false;

  func(...args, (...d) => {
    value = d;
    complete = true;
  });

  while (!complete) {
    Date.now();
  }

  return value;
};
