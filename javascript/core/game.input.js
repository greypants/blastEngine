Game.input = {
	keys: {
		32: 'spacebar',
		37: 'left',
		39: 'right'
	},

	init: function() {
		Game.input.pressed = {};
		window.addEventListener('keyup', Game.input.keyInteraction);
		window.addEventListener('keydown', Game.input.keyInteraction);
	},

	keyInteraction: function(event) {
		var code = event.keyCode;
		if(Game.input.keys[code]) {
			event.preventDefault();
			Game.input.pressed[Game.input.keys[code]] = (event.type === 'keydown') ? true : false;
			// Need more info here.
			// - press (initial press)
			// - down (true as long as down)
			// - hold (what counts as a hold? + .5 seconds?)
			// - release (initial release)
		}
	}
};
