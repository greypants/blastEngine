Game.Object = function(properties) {
	if(properties) {
		this.set(properties);
	}
};

Game.Object.prototype.set = function(properties){
	for(var property in properties) {
		this[property] = properties[property];
	}
	this.color = this.color || 'black';
	this.rotation = this.rotation || 0;
	this.scale = this.scale || 1;
};

Game.Object.prototype.draw = function() {
	Game.ctx.save();

	// Round to whole pixel
	var x = (this.x + 0.5) | 0;
	var y = (this.y + 0.5) | 0;

	// Apply Transformations (scale and rotate from center)
	Game.ctx.translate(x + this.width / 2, y + this.height / 2);
	Game.ctx.rotate(this.rotation);
	Game.ctx.scale(this.scale, this.scale);
	Game.ctx.translate(-this.width/2, -this.height/2);

	// Call extended Object Type's draw method
	this.drawType && this.drawType();

	Game.ctx.restore();
};
