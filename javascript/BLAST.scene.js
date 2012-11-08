window.BLAST = window.BLAST || {};

(function(blast) {

	var scene = blast.scene = {
		init: function() {
			scene.createObjects();
			blast.frames.actions.push(scene.frameActions);
		},

		createObjects: function() {
			scene.missiles = [];
			scene.enemies = [];
			scene.ship = new blast.Ship();
		},

		checkKeys: function() {
			var leftIsDown = 37 in blast.keysDown;
			var rightIsDown = 39 in blast.keysDown;
			var spacebarIsDown = 32 in blast.keysDown;

			if(!leftIsDown && !rightIsDown){
				scene.ship.vx = 0;
			}

			if(leftIsDown) {
				scene.ship.vx = scene.ship.speed * blast.frames.delta * -1;
			}

			if(rightIsDown) {
				scene.ship.vx = scene.ship.speed * blast.frames.delta;
			}

			if(spacebarIsDown) {
				scene.ship.fire();
			}
		},

		frameActions: function() {
			blast.ctx.clearRect(0, 0, blast.canvas.width, blast.canvas.height);
			scene.ship.move();
			scene.ship.draw();
			for (var i = scene.missiles.length; i--;) {
				var missile = scene.missiles[i];
				if(missile.isLive) {
					missile.move();
					missile.draw();
				}
			}
		}
	};

})(window.BLAST);