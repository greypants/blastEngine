module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    coffee: {
      glob_to_multiple: {
        expand: true,
        flatten: false,
        cwd: 'javascript/',
        src: ['**/*.coffee'],
        dest: 'javascript/',
        ext: '.js'
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'stylesheets',
          cssDir: 'stylesheets',
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
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: "path/to/base",
          mainConfigFile: "path/to/config.js",
          name: "vendor/almond", // assumes a production build using almond
          out: "path/to/optimized.js"
        }
      }
    },

    watch: {
      css: {
        files: [
          'stylesheets/*.scss'
        ],
        tasks: ['compass'],
        options: {
          livereload: true
        }
      },
      js: {
        files: [
          'javascript/*.js',
          'Gruntfile.js'
        ],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },

      coffee: {
        files: ['javascript/**/*.coffee'],
        tasks: ['coffee']
      }
    }
  });

  // Load the Grunt plugins.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  // Register the default tasks.
  grunt.registerTask('default', ['watch']);
};