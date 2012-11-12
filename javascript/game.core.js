window.GAME = window.GAME || {};

(function(game) {

	var core = game.core = {

		clearCanvas: function() {
			game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
		},

		createCanvas: function(width, height) {
			game.canvas = document.createElement('canvas');
			game.ctx = game.canvas.getContext('2d');
			game.canvas.width = width;
			game.canvas.height = height;
			document.getElementById('canvas-wrapper').appendChild(game.canvas);
		},

		getRandomNumber: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},

		initGlobalVariables: function() {
			game.keysDown = [];
		},

		isCollision: function(a, b){
			return  a.x <= (b.x + b.width) &&
					b.x <= (a.x + a.width) &&
					a.y <= (b.y + b.height) &&
					b.y <= (a.y + a.height);
		},

		loadScene: function(name) {
			game.scene = game.scenes[name];
			game.scene.init();
		}
	};

})(window.GAME);