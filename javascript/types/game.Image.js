window.GAME = window.GAME || {};

(function(game) {

	game.Image = function(src) {
		this.load(src);
		this.x = 0,
		this.y = 0;
	};

	game.Image.prototype = new game.Object();

	game.Image.prototype.load = function(src) {
		var thisImage = this;

		thisImage.ready = false;
		thisImage.image = new Image();
		thisImage.image.src = src;

		thisImage.image.onload = function () {
			thisImage.ready = true;
		};

	};

	game.Image.prototype.drawType = function() {
		if(this.ready) {
			game.ctx.drawImage(this.image, 0, 0);
		}
	};

})(window.GAME);