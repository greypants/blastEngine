define([
	'engine/frames',
	'engine/input',
	'engine/canvas'
], function(
	Frames,
	Input,
	Canvas
) {
	return klass({
		initialize: function(game) {
			// this.debug = true;
			if(game) {
				this.extend(game);
			}

			this.audioPath = 'audio/';
			// this.initGlobalVariables();
			// this.loadedGame = game;
			// this.loadScene('initial');
			this.canvas = new Canvas(1200, 675);
			this.input = new Input();
			this.frames = new Frames();
			this.frames.play();
		},

		getRandomNumber: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},

		initGlobalVariables: function() {
			this.loadedGame = {};
			this.input.keysDown = [];
		},

		isCollision: function(a, b){
			return  a.x <= (b.x + b.width) &&
					b.x <= (a.x + a.width) &&
					a.y <= (b.y + b.height) &&
					b.y <= (a.y + a.height);
		},

		loadScene: function(scenes) {
			this.scene = this.loadedGame[scenes];
			this.scene.init();
		}
	});
});
