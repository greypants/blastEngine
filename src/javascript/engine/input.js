define(function() {
	return klass({
		keys: {
			32: 'spacebar',
			37: 'left',
			39: 'right'
		},

		initialize: function() {
			this.pressed = {};
			window.addEventListener('keyup', this.keyInteraction.bind(this));
			window.addEventListener('keydown', this.keyInteraction.bind(this));
		},

		keyInteraction: function(event) {
			var code = event.keyCode;
			if(this.keys[code]) {
				event.preventDefault();
				this.pressed[this.keys[code]] = (event.type === 'keydown') ? true : false;
			}
		}
	});
});
