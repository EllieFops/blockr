"use strict";

const base = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

const pad = (s) => "0000000000000000".substring(s.length) + s;

/**
 * Put ID in data tree
 *
 * @param {string[]|string} arr
 * @param {object}          tree
 */
const put = ( arr, tree ) => {

  const x = (typeof arr === "string") ? pad(arr).split("") : arr;
  const c = parseInt(x.shift());
  const r = x.length > 0;

  if (!tree[c]) {
    tree[c] = r ? {} : 1;
  }

  if (r) {
    put(x, tree[c]);
  }

  // Convert node to array to condense storage
  if( !Array.isArray(tree[c]) && Object.keys(tree[c]).length === base.length ) {

    const node = [];

    for ( const i of base ) {
      node.push(tree[c][i]);
    }

    tree[c] = node;
  }
};

/**
 * Determine if data tree contains an ID
 *
 * @param {string[]|string} arr
 * @param {object}   tree
 *
 * @return {boolean}
 */
const has = ( arr, tree ) => {

  if ( arr === null || arr === undefined ) {
    return false;
  }

  const x = (typeof arr === "string") ? pad(arr).split("") : arr;
  const c = parseInt(x.shift());
  const r = x.length > 0;

  if (!tree[c]) {
    return false;
  }

  if (!r) {
    return tree[c] === 1;
  } else {
    return has(x, tree[c]);
  }
};

/**
 * Flatten Data Tree Into Array Of IDs
 *
 * @param {object} tree
 *
 * @return {string[]}
 */
const flatten = ( tree ) => {

  const ret = [];

  for ( let i = 0; i < 10; i++ ) {

    if (!tree[i]) {
      continue;
    }

    if (Object.keys(tree[i]).length === 0) {
      return i.toString();
    }

    for ( const x of flatten(tree[i]) ) {
      ret.push(i.toString() + x);
    }
  }

  return ret;
};

module.exports = { flatten, has, put };
