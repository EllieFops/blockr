(function () {
  'use strict';

  /**
   * Boot Blockr
   *
   * @param ops
   */
  function boot( ops ) {
    var run = getDashboardUpdater(ops);

    ops.load(
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

      if (!e.srcElement.classList.contains("block-post-button")) {
        return;
      }

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

    if (!contentDiv) {
      return null;
    }

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
        if (ops.has(getRootId(e))) {
          e.remove();
        } else {
          modifyPost(e);
        }
      }
    };
  }

  boot(
    (function () {
      var z = {};

      /**
       * Attempt to collapse tree node
       *
       * @param obj Tree node
       *
       * @return {*}
       * @private
       */
      function _check( obj ) {

        if (!obj) {
          return;
        }

        var coll = new Array(10);

        for ( var a = 0, b = 9; a < 5; a++, b-- ) {

          if (obj[a] && obj[b]) {
            coll[a] = obj[a];
            coll[b] = obj[b];
            continue;
          }

          var c = a.toString();
          var d = b.toString();

          if (!obj[c] || !obj[d]) {
            return obj;
          }

          coll[a] = obj[c];
          coll[b] = obj[d];
        }

        return coll;
      }

      function _traverse( tree ) {

        if (!tree) {
          return;
        }

        var out = {};

        for ( var a = 0; a < 10; a++ ) {

          var prop;

          if (tree[a]) {
            prop = _check(_traverse(tree[a]));
            if (prop) {
              out[a] = prop;
            }
            continue;
          }

          var b = a.toString();

          if (!tree[b]) {
            continue;
          }

          prop = _check(_traverse(tree[b]));
          if (prop) {
            out[b] = prop;
          }
        }

        return out;
      }

      return {

        /**
         * Load the post blacklist structure.
         */
        load: function ( fun ) {
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
          chrome.storage.local.set({ "tumblr_blacklist": _check(_traverse(z)) }, function () {});
        }
      };
    })()
  );

  function a( s, h ) {document.addEventListener(s, h);}
})();
