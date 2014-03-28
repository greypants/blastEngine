/**
 * @name Canvas
 * @desc desc
 */

define(function() {
	return klass({
		initialize: function(width, height, id) {
			this.height = height;
			this.width = width;
			this.id = id || 'canvas-wrapper';
			this.create();
			this.append();
		},

		append: function() {
			document.getElementById(this.id).appendChild(this.el);
		},

		clear: function(object) {
			var x = 0;
			var y = 0;
			var width = this.width;
			var height = this.height;

			if(object) {
				x = object.x - 1;
				y = object.y - 1;
				width = object.width + 2;
				height = object.height + 2;
			}

			this.ctx.clearRect(x, y, width, height);
		},

		create: function() {
			this.el = document.createElement('canvas');
			this.ctx = this.el.getContext('2d');
			this.el.width = this.width;
			this.el.height = this.height;
		}
	});
});
