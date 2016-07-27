module.exports = function ( grunt ) {
  grunt.initConfig(
    {
      jshint: {
        options: {
          curly: true,
          eqeqeq: true,
          esversion: 6,
          forin: true,
          freeze: true,
          maxcomplexity: 10,
          maxparams: 4,
          noarg: true,
          browser: true,
          node: true
        },
        default: ["src/main/js/**/*.js"]
      }
    }
  );


  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask("default", ["jshint"]);
};
