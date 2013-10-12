Game.frames = {
	init: function() {
		this.delta = 0;
		window.addEventListener('blur', this.pause.bind(this), false);
		window.addEventListener('focus', this.play.bind(this), false);
	},

	loop: function() {
		this.setDelta();
		this.runFrameActions();
		this.animationFrame = window.requestAnimationFrame(this.loop.bind(this));
	},

	pause: function() {
		window.cancelAnimationFrame(this.animationFrame);
		this.isPlaying = false;
	},

	play: function() {
		if(!this.isPlaying) {
			this.then = Date.now();
			this.loop();
			this.isPlaying = true;
		}
	},

	runFrameActions: function() {
		for (var i = 0; i < this.actions.length; i++) {
			this.actions[i]();
		}
	},

	setDelta: function() {
		this.now = Date.now();
		this.delta = (this.now - this.then) / 1000; // seconds since last frame
		this.then = this.now;
	}
};
