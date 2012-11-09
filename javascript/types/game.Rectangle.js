window.GAME = window.GAME || {};

(function(game) {

	game.Rectangle = function() {

	};

	game.Rectangle.prototype.init = function(data){
		for(var property in data) {
			this[property] = data[property];
		}
		this.color = this.color || 'black';
		this.rotation = this.rotation || 0;
		this.scale = this.scale || 1;
	};

	game.Rectangle.prototype.draw = function() {
		// Round to whole pixel
		var x = (this.x + 0.5) | 0;
		var y = (this.y + 0.5) | 0;

		game.ctx.save();
		game.ctx.translate(this.x, this.y);
		game.ctx.rotate(this.rotation);
		game.ctx.scale(this.scaleX, this.scaleY);
		game.ctx.fillStyle = this.color;
		game.ctx.beginPath();
		game.ctx.fillRect(0,0,this.width, this.height);
		game.ctx.closePath();
		game.ctx.fill();
		game.ctx.restore();
	};

})(window.GAME);