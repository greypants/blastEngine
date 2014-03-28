var gulp = require('gulp');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');

module.exports = function() {
	gulp.src('./src/images/**')
		.pipe(imagemin())
		.pipe(gulp.dest('./build/images'))
		.pipe(livereload());
};
