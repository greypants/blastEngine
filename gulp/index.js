var gulp = require('gulp');

module.exports = function(defaultTasks, standaloneTasks) {
	standaloneTasks = standaloneTasks || [];

	var allTasks = defaultTasks.concat(standaloneTasks);

	// Require and define each task in the list
	allTasks.forEach(function(name) {
		gulp.task(name, require('./tasks/' + name));
	});

	// Assign default tasks
	gulp.task('default', defaultTasks);
};