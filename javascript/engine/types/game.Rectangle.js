Game.Rectangle = function(properties) {
	properties && this.set(properties);
};

Game.Rectangle.prototype = new Game.Object();

Game.Rectangle.prototype.drawType = function() {
	Game.ctx.fillStyle = this.color;
	Game.ctx.fillRect(0,0,this.width, this.height);
	Game.ctx.fill();
};
