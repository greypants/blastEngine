var defaultTasks = [
	'serve',
	'watch'
];

var otherTasks = [
	'audio',
	'browserify',
	'compass',
	'images'
];

require('./gulp')(defaultTasks, otherTasks);
