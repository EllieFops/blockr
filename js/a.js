(function () {
  'use strict';

  /**
   * Boot Blockr
   *
   * @param ops
   */
  function boot( ops ) {
    var run = getDashboardUpdater(ops);

    ops.deserialize(
      function () {
        a("click", blockClicked(ops));
        a("scroll", run);
        run();
      }
    );
  }

  /**
   * Create Block Button Click Handler
   *
   * @param ops
   * @returns {Function}
   */
  function blockClicked( ops )
  {
    return function ( e )
    {
      var li;

      if (!e.srcElement.classList.contains("block-post-button"))
        return;

      li = e.srcElement.parentElement;

      ops.push(getRootId(li));
      li.remove();

      setTimeout(function () {ops.save();}, 200);
    };
  }

  /**
   * Create Block Button
   *
   * @returns {HTMLAnchorElement}
   */
  function createButton()
  {
    var anchor;
    anchor = document.createElement("a");
    anchor.classList.add("block-post-button");
    anchor.text = "X";
    return anchor;
  }

  /**
   * Get Post root_id
   *
   * @param post
   * @returns {string|null}
   */
  function getRootId( post ) {

    var contentDiv, attr;

    contentDiv = post.children[0];

    if (!contentDiv)
      return null;

    attr = contentDiv.attributes.getNamedItem("data-root_id");

    return attr ? attr.nodeValue : null;
  }

  /**
   * Append the block button to the post
   *
   * @param post
   */
  function modifyPost( post ) {
    post.style.position = "relative";
    post.appendChild(createButton());
    post.classList.add("buttoned");
  }

  function getDashboardUpdater( ops ) {
    return function () {
      var p = document.querySelectorAll("li.post_container:not(.buttoned):not(#new_post_buttons)");
      var j = p.length;
      for ( var i = 0; i < j; i++ ) {
        var e = p.item(i);
        if (ops.contains(getRootId(e)))e.remove();
        else modifyPost(e);
      }
    };
  }

  boot(
    (function () {
      var z = {};

      /**
       * Contains Check
       *
       * @param array {string[]} Path characters
       * @param data  {Object}   Object to traverse
       *
       * @returns {boolean}
       * @private
       */
      function _contains( array, data ) {
        if (array.length === 0)return true;
        var c = array.shift();
        if (!data[c])return false;
        return _contains(array, data[c]);
      }

      /**
       * Push Data
       *
       * @param path {string[]} Path Characters
       * @param data {Object}   Stored IDs to traverse
       *
       * @private
       */
      function _p( path, data ) {
        var c = path.shift();
        if (!data[c])data[c] = {};
        if (path.length > 0)_p(path, data[c]);
      }

      return {

        /**
         * Push A New ID Into the ID structure.
         *
         * @param id {string} ID to push
         */
        push: function ( id ) {
          var a = (typeof id == "string") ? id.split("") : id;
          _p(a, z);
        },

        /**
         * Check if an ID is stored in the structure
         *
         * @param id {string} ID to check for
         *
         * @returns {boolean}
         */
        contains: function ( id ) {
          if (null === id)return false;
          return _contains(id.split(""), z);
        },

        /**
         * Load the post blacklist structure.
         */
        deserialize: function ( fun ) {
          JSON.parse(
            chrome.storage.local.get(
              "tumblr_blacklist", function ( data ) {
                data = data.tumblr_blacklist || {};
                z = !data ? {} : data;
                fun();
              }
            )
          );
        },

        /**
         * Store the post blacklist structure
         */
        save: function () {
          chrome.storage.local.set({ "tumblr_blacklist": z }, function () {});
        }
      };
    })()
  );

  function a( s, h ) {document.addEventListener(s, h);}
})();
