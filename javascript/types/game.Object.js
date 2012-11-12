window.GAME = window.GAME || {};

(function(game) {

	game.Object = function(properties) {
		if(properties) {
			this.set(properties);
		}
	};

	game.Object.prototype.set = function(properties){
		for(var property in properties) {
			this[property] = properties[property];
		}
		this.color = this.color || 'black';
		this.rotation = this.rotation || 0;
		this.scale = this.scale || 1;
	};

	game.Object.prototype.draw = function(drawType) {
		game.ctx.save();

		// Round to whole pixel
		var x = (this.x + 0.5) | 0;
		var y = (this.y + 0.5) | 0;

		// Apply Transformations
		game.ctx.translate(x, y);
		game.ctx.rotate(this.rotation);
		game.ctx.scale(this.scaleX, this.scaleY);

		// Call extended Object Type's draw method
		this.drawType && this.drawType();

		game.ctx.restore();
	};

})(window.GAME);