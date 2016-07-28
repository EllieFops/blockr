"use strict";

exports.makeBlockButton = () => {
  const a = document.createElement("a");
  a.classList.add("block-post-button");
  a.appendChild(document.createTextNode("X"));
  return a;
};

exports.getRootId = ( p ) => {
  const c = p.children[0];
  if (!c) { return null; }
  const a = c.attributes.getNamedItem("data-root_id");
  return a ? a.nodeValue : null;
};

exports.modifyPost = ( e ) => {
  e.style.position = "relative";
  e.appendChild(exports.makeBlockButton());
  e.classList.add("buttoned");
};
