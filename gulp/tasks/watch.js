var gulp = require('gulp');

module.exports = function(){
	gulp.watch('src/javascript/**/*', ['browserify']);
	gulp.watch('src/sass/**', ['compass']);
	gulp.watch('src/images/**', ['images']);
	gulp.watch('src/audio/**', ['audio']);
};