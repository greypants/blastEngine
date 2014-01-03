/**
 * @name Rectangle
 * @desc A basic rectangle object
 */

define(['engine/objects/base'], function(Base) {
	return Base.extend({
		initialize: function(ctx, properties) {
			this.supr(ctx, properties);
		},

		drawType: function() {
			this.ctx.fillStyle = this.color;
			this.ctx.fillRect(0,0,this.width, this.height);
			this.ctx.fill();
		}
	});
});
