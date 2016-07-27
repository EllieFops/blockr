(function () {
  "use strict";

  const Manifest = chrome.runtime.getManifest();

  const Migrations = {
    "1.1.0": function ( cb ) {
      const fill = "0000000000000000";
      const width = 16;

      chrome.storage.local.get("tumblr_blacklist", function(a) {
        const b = a.tumblr_blacklist || {};
        const c = entwine(b);
        const d = [];

        for ( const e of c ) {
          d.push(pad(e));
        }
      });

      function entwine( o ) {
        var b = [];

        for ( var i = 0; i < 10; i++ ) {
          if (!o[i]) continue;
          if (Object.keys(o[i]).length == 0) return i.toString();
          for ( var x of a(o[i]) ) b.push(i.toString() + x);
        }

        return b;
      }

      function pad( s ) { return fill.substring(0, width - s.length) + s; }
    }
  };

  function putVersion( ver ) {
    chrome.storage.local.set({ "version": ver });
  }

  function getVersion() {
    chrome.storage.local.get(
      "version", function ( data ) {
        if (!data.version) {
          to1_1_0();
          putVersion("1.1.0");
        }
      }
    );
  }

  function run() {
    const a = getVersion();

    for ( const b in Migrations ) {
      if (!Migrations.hasOwnProperty(b)) continue;
      if (b > a) return Migrations[b](function() {putVersion(b); run();});
    }

    putVersion(c);
  }

  run();
})();
