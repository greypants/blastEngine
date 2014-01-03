Game.Image = Game.Object.extend({
	initialize: function(src) {
		this.load(src);
		this.x = 0,
		this.y = 0;
	},

	drawType: function() {
		if(this.ready) {
			Game.ctx.drawImage(this.image, 0, 0);
		}
	},

	load: function(src) {
		var thisImage = this;

		thisImage.ready = false;
		thisImage.image = new Image();
		thisImage.image.src = src;

		thisImage.image.onload = function () {
			thisImage.ready = true;
		};
	}
});
