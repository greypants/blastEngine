window.GAME = window.GAME || {};

(function(game) {

	var frames = game.frames = {
		init: function() {
			window.addEventListener('blur', frames.pause, false);
			window.addEventListener('focus', frames.play, false);
		},

		loop: function() {
			frames.setDelta();
			frames.runFrameActions();
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

		runFrameActions: function() {
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

})(window.GAME);