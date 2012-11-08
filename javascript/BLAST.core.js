window.BLAST = window.BLAST || {};

(function(blast) {

	var core = blast.core = {
		createCanvas: function() {
			blast.canvas = document.createElement("canvas");
			blast.ctx = blast.canvas.getContext("2d");
			blast.canvas.width = 800;
			blast.canvas.height = 450;
			document.body.appendChild(blast.canvas);
		},

		addListeners: function() {
			window.addEventListener('keydown', core.keydown, false);
			window.addEventListener('keyup', core.keyup, false);
		},

		initGlobalVariables: function() {
			blast.keysDown = [];
			blast.missiles = [];
		},

		isCollision: function(a, b){
			return  a.x <= (b.x + b.width) &&
					b.x <= (a.x + a.width) &&
					a.y <= (b.y + b.height) &&
					b.y <= (a.y + a.height);
		},

		isGameKey: function(e) {
			return (
				e.keyCode === 32 ||
				e.keyCode === 37 ||
				e.keyCode === 38 ||
				e.keyCode === 39 ||
				e.keyCode === 40
			);
		},

		keydown: function(e) {
			if(core.isGameKey(e)) {
				e.preventDefault();
				blast.keysDown[e.keyCode] = true;
				blast.scene.checkKeys();
			}
		},

		keyup: function(e) {
			if(core.isGameKey(e)) {
				e.preventDefault();
				delete blast.keysDown[e.keyCode];
				blast.scene.checkKeys();
			}
		}
	};

})(window.BLAST);