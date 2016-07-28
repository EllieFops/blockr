"use strict";

const { getRootId, modifyPost } = require("./UI");

exports.blockPost = c => e => {
  if (!e.srcElement.classList.contains("block-post-button")) { return; }
  const li = e.srcElement.parentElement;
  c(getRootId(li));
  li.remove();
};

exports.pageScroll = h => () => {
  const p = document.querySelectorAll("li.post_container:not(.buttoned):not(#new_post_buttons)");
  const q = p.length;

  for ( let i = 0; i < q; i++ ) {
    const e = p.item(i);
    if (h(getRootId(e))) {
      e.remove();
    } else {
      modifyPost(e);
    }
  }
};
