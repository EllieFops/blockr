const pckg = require("./package.json");
const mani = require("./manifest.json");
const fs   = require('fs');

module.exports = function ( grunt ) {

  mani.version = pckg.version;
  fs.writeFileSync("./manifest.json", JSON.stringify(mani), "utf-8");

  grunt.initConfig(
    {
      jshint:     {
        options: {
          curly:         true,
          eqeqeq:        true,
          esversion:     6,
          forin:         true,
          freeze:        true,
          undef:         true,
          maxcomplexity: 10,
          maxparams:     4,
          noarg:         true,
          browser:       true,
          node:          true,
          strict:        "global",
          unused:        true,
          varstmt:       true,
          globals:       {
            "chrome":   false,
            "document": false
          }
        },
        default: ["src/main/js/**/*.js"]
      },
      mkdir:      {
        default: {
          options: {
            create: ["build/js", "build/zip", "build/es5", "build/out/js", "build/out/css", "build/out/res"]
          }
        }
      },
      zip:        {
        default: {
          cwd: "build/out/",
          dest: "build/zip/blockr.zip",
          src:  ["build/out/js/*.js", "build/out/manifest.json", "build/out/css/*.css", "build/out/res/*.png"]
        }
      },
      clean:      { default: ["build/"] },
      browserify: {
        default: {
          files: {
            "build/out/js/blockr.js":     ['src/main/js/Blockr.js'],
            "build/out/js/background.js": ["src/main/js/ch/Background.js"]
          }
        }
      },
      babel:      {
        options: {
          sourceMap: false,
          presets:   ["babel-preset-es2015"]
        },
        default: {
          files: {
            "build/es5/blockr.js":     "build/js/blockr.js",
            "build/es5/background.js": "build/js/background.js"
          }
        }
      },
      copy:       {
        default: {
          files: [
            { expand: true, filter: 'isFile', flatten: true, src: ["res/**"], dest: "build/out/res/" },
            { expand: true, filter: 'isFile', flatten: true, src: ["src/main/css/**"], dest: "build/out/css/" },
            { src: ["manifest.json"], dest: "build/out/"}
          ]
        }
      },
      uglify:     {
        options: {
          mangle: false
        },
        default: {
          files: {
            "build/out/js/blockr.js":     ["build/es5/blockr.js"],
            "build/out/js/background.js": ["build/es5/background.js"]
          }
        }
      }
    }
  );

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-mkdir");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-zip");

  grunt.registerTask("default", ["jshint", "clean", "mkdir", "browserify", "copy", "zip"]);
};
