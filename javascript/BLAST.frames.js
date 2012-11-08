window.BLAST = window.BLAST || {};

(function(blast) {

	var frames = blast.frames = {
		init: function() {
			frames.actions = frames.actions || [];
			window.addEventListener('blur', frames.pause, false);
			window.addEventListener('focus', frames.play, false);
		},

		loop: function() {
			frames.setDelta();
			frames.runMethods();
			frames.animationFrame = window.requestAnimationFrame(frames.loop);
		},

		pause: function() {
			window.cancelAnimationFrame(frames.animationFrame);
			frames.areRunning = false;
		},

		play: function() {
			if(!frames.areRunning) {
				frames.then = Date.now();
				frames.loop();
				frames.areRunning = true;
			}
		},

		runMethods: function() {
			for (var i = 0; i < frames.actions.length; i++) {
				frames.actions[i]();
			}
		},

		setDelta: function() {
			frames.now = Date.now();
			frames.delta = (frames.now - frames.then) / 1000; // seconds since last frame
			frames.then = frames.now;
		}
	};

})(window.BLAST);