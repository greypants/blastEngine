window.GAME = window.GAME || {};

(function(game) {

	var input = game.input = {
		keys: {
			32: 'spacebar',
			37: 'left',
			39: 'right'
		},

		init: function() {
			input.pressed = {};
			window.addEventListener('keyup', input.keyInteraction);
			window.addEventListener('keydown', input.keyInteraction);
		},

		keyInteraction: function(event) {
			var code = event.keyCode;
			if(input.keys[code]) {
				event.preventDefault();
				input.pressed[input.keys[code]] = (event.type === 'keydown') ? true : false;
				// Need more info here.
				// - press (initial press)
				// - down (true as long as down)
				// - hold (what counts as a hold? + .5 seconds?)
				// - release (initial release)
			}
		}
	};

})(window.GAME);