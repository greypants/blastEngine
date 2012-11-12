window.GAME = window.GAME || {};

(function(game) {

	game.Rectangle = function(properties) {
		properties && this.set(properties);
	};

	game.Rectangle.prototype = new game.Object();

	game.Rectangle.prototype.drawType = function() {
		game.ctx.fillStyle = this.color;
		game.ctx.fillRect(0,0,this.width, this.height);
		game.ctx.fill();
	};

})(window.GAME);