/**
 * @name Image
 * @desc Game object that can have an image attached to it
 */

define(['engine/objects/base'], function(Base) {
	return Base.extend({
		initialize: function(ctx, options) {
			this.supr(ctx, options);
			this.load();
		},

		drawType: function() {
			if(this.ready) {
				this.ctx.drawImage(this.image, 0, 0);
			}
		},

		load: function() {
			var thisImage = this;

			thisImage.ready = false;
			thisImage.image = new Image();
			thisImage.image.src = this.src;

			thisImage.image.onload = function () {
				thisImage.ready = true;
			};
		}
	});
});
