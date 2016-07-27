"use strict";

/**
 * Put ID in data tree
 *
 * @param {string[]} arr
 * @param {object}   tree
 */
const put = ( arr, tree ) => {
  const c = parseInt(arr.shift());
  const r = arr.length > 0;

  if (!tree[c]) {
    tree[c] = r ? {} : 1;
  }

  if (r) {
    put(arr, tree);
  }
};

/**
 * Determine if data tree contains an ID
 *
 * @param {string[]} arr
 * @param {object}   tree
 *
 * @return {boolean}
 */
const has = ( arr, tree ) => {
  const c = parseInt(arr.shift());
  const r = arr.length > 0;

  if (!tree[c]) {
    return false;
  }

  if (r) {
    return tree[c] === 1;
  } else {
    return has(arr, tree);
  }
};

/**
 * Put ID Into Data Tree
 *
 * @param {string} id
 * @param {object} tree
 */
exports.put = ( id, tree ) => put(id.split(""));

/**
 * Check if Data Tree contains ID
 *
 * @param {string} id
 * @param {object} tree
 *
 * @return {boolean}
 */
exports.has = ( id, tree ) => has(id.split(""));

/**
 * Flatten Data Tree Into Array Of IDs
 *
 * @param {object} tree
 *
 * @return {string[]}
 */
exports.flatten = ( tree ) => {
  const ret = [];

  for ( let i = 0; i < 10; i++ ) {

    if (!tree[i]) {
      continue;
    }

    if (Object.keys(tree[i]).length === 0) {
      return i.toString();
    }

    for ( const x of a(o[i]) ) {
      ret.push(i.toString() + x);
    }

  }

  return ret;
};

