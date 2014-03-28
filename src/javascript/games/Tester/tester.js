define([
	'engine/game',
	'engine/objects/image'
], function(Game, Img) {

	return Game.extend({
		initialize: function() {
			this.supr();
			this.rectangle = new Img(this.canvas.ctx, {
				src: 'images/enemy.png',
				height: 81,
				width: 97
			});
			// Push methods to run every frame
			this.frames.actions = [
				this.tic.bind(this)
			];
		},

		tic: function() {
			this.canvas.clear();
			this.rectangle.y = 100 + (Math.sin(Date.now()/1000) * 100);
			this.rectangle.x = 500 + (Math.sin(Date.now()/2000) * 500);
			this.rectangle.draw();
		}
	});
});