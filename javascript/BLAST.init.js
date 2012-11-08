window.BLAST = window.BLAST || {};

(function(blast) {

	blast.init = function() {
		blast.core.createCanvas();
		blast.frames.init();
		blast.core.initGlobalVariables();
		blast.core.addListeners();
		blast.scene.init();
		blast.frames.play();
	};

})(window.BLAST);