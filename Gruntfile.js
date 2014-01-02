module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      css: {
        files: [
          '**/*.sass',
          '**/*.scss'
        ],
        tasks: ['compass']
      },
      js: {
        files: [
          'javascript/*.js',
          'Gruntfile.js'
        ],
        tasks: ['jshint']
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'stylesheets/',
          cssDir: 'stylesheets/',
          outputStyle: 'compressed'
        }
      }
    },
    jshint: {
      options: {
        "evil": true,
        "regexdash": true,
        "browser": true,
        "wsh": true,
        "trailing": true,
        "sub": true,
        "expr": true
      },
      all: ['Gruntfile.js', 'assets/js/*.js']
    }
  });

  // Load the Grunt plugins.
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Register the default tasks.
  grunt.registerTask('default', ['watch']);
};