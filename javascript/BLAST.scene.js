window.BLAST = window.BLAST || {};

(function(blast) {

	var scene = blast.scene = {
		init: function() {
			blast.ship = new blast.Ship();
			blast.frames.actions.push(scene.frameActions);
		},

		checkKeys: function() {
			var leftIsDown = 37 in blast.keysDown;
			var rightIsDown = 39 in blast.keysDown;
			var spacebarIsDown = 32 in blast.keysDown;

			if(!leftIsDown && !rightIsDown){
				blast.ship.vx = 0;
			}

			if(leftIsDown) {
				blast.ship.vx = blast.ship.speed * blast.frames.delta * -1;
			}

			if(rightIsDown) {
				blast.ship.vx = blast.ship.speed * blast.frames.delta;
			}

			if(spacebarIsDown) {
				blast.ship.fire();
			}
		},

		frameActions: function() {
			blast.ctx.clearRect(0, 0, blast.canvas.width, blast.canvas.height);
			blast.ship.move();
			blast.ship.draw();
		}
	};

})(window.BLAST);