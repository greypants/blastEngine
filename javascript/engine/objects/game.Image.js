Game.Image = function(src) {
	this.load(src);
	this.x = 0,
	this.y = 0;
};

Game.Image.prototype = new Game.Object();

Game.Image.prototype.load = function(src) {
	var thisImage = this;

	thisImage.ready = false;
	thisImage.image = new Image();
	thisImage.image.src = src;

	thisImage.image.onload = function () {
		thisImage.ready = true;
	};

};

Game.Image.prototype.drawType = function() {
	if(this.ready) {
		Game.ctx.drawImage(this.image, 0, 0);
	}
};
