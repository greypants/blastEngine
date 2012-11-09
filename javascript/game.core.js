window.GAME = window.GAME || {};

(function(game) {

	var core = game.core = {

		addListeners: function() {
			window.addEventListener('keydown', core.keydown, false);
			window.addEventListener('keyup', core.keyup, false);
		},

		clearCanvas: function() {
			game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
		},

		createCanvas: function(width, height) {
			game.canvas = document.createElement("canvas");
			game.ctx = game.canvas.getContext("2d");
			game.canvas.width = width;
			game.canvas.height = height;
			document.body.appendChild(game.canvas);
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

		isGameKey: function(e) {
			return (
				e.keyCode === 32 ||
				e.keyCode === 37 ||
				e.keyCode === 38 ||
				e.keyCode === 39 ||
				e.keyCode === 40
			);
		},

		keydown: function(e) {
			if(core.isGameKey(e)) {
				e.preventDefault();
				game.keysDown[e.keyCode] = true;
				game.scene.checkKeys();
			}
		},

		keyup: function(e) {
			if(core.isGameKey(e)) {
				e.preventDefault();
				delete game.keysDown[e.keyCode];
				game.scene.checkKeys();
			}
		},

		loadScene: function(name) {
			game.scene = game.scenes[name];
			game.scene.init();
		}
	};

})(window.GAME);