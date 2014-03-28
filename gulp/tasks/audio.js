var gulp = require('gulp');
var livereload = require('gulp-livereload');

module.exports = function() {
	// Eventually output mp3s from here
	gulp.src('./src/audio/**')
		.pipe(gulp.dest('./build/audio'))
		.pipe(livereload());
};
