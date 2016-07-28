"use strict";

const { save, load } = require("./ch/Env").storage;
const { tree }  = require("./Configuration").keys;
const { has, put }  = require("./DataTree");
const { pageScroll, blockPost } = require('./Event');

load(tree)
  .then(v => {

    const data   = v[tree] || {};
    const scroll = pageScroll(i => has(i, data));

    document.addEventListener("click", blockPost(i => {
      put(i, data);
      save({ [tree]: data });
    }));

    document.addEventListener("scroll", scroll);
    scroll();
  });
