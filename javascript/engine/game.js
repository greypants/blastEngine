var Game = {
	load: function(game) {
		// this.debug = true;
		this.audioPath = 'audio/';
		this.createCanvas(1200, 675);
		this.initGlobalVariables();
		this.loadedGame = game;
		this.loadScene('initial');
		this.input.init();
		this.frames.init();
		this.frames.play();
	},

	clearCanvas: function() {
		Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
	},

	createCanvas: function(width, height) {
		Game.height = height;
		Game.width = width;
		Game.canvas = document.createElement('canvas');
		Game.ctx = Game.canvas.getContext('2d');
		Game.canvas.width = width;
		Game.canvas.height = height;
		document.getElementById('canvas-wrapper').appendChild(Game.canvas);
	},

	getRandomNumber: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	initGlobalVariables: function() {
		Game.loadedGame = {};
		Game.keysDown = [];
	},

	isCollision: function(a, b){
		return  a.x <= (b.x + b.width) &&
				b.x <= (a.x + a.width) &&
				a.y <= (b.y + b.height) &&
				b.y <= (a.y + a.height);
	},

	loadScene: function(scenes) {
		Game.scene = Game.loadedGame[scenes];
		Game.scene.init();
	}
};
