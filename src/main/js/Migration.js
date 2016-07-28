"use strict";
const K = require("./Configuration").keys;
const S = require("./ch/Env").storage;
const T = require("./DataTree");

const migs = {
  "1.1.0": () => S.load("tumblr_blacklist").then(( v ) => {
    const list = T.flatten(v.tumblr_blacklist || {});
    const tree = {};

    for ( const id of list ) {
      const newId = "0000000000000000".substring(id.length) + id;
      T.put(newId, tree);
    }

    return S.drop("tumblr_blacklist").then(() => S.save({ [K.tree]: tree }));
  })
};

exports.migrate = ( newVersion ) => S.load(K.version)
  .then(( v ) => {
    let d = v[K.version] || "0.0.0";
    const x = [];
    for ( const k in migs ) {
      if (!migs.hasOwnProperty(k)) {
        continue;
      }
      if (k > d) {
        x.push(migs[k]());
        d = k;
      }
    }

    return Promise.all(x).then( () => S.save({ [K.version]: newVersion }));
  });


