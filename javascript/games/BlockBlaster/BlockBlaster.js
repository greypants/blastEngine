var BlockBlaster = {};

(function(){
	var scene = BlockBlaster.initial = {
		init: function() {
			scene.createObjects();

			// Push methods to run every frame
			Game.frames.actions = [
				Game.clearCanvas,
				scene.updateShip,
				scene.updateMissles,
				scene.updateEnemies
			];
		},

		checkCollisions: function(enemy) {
			for (var i = scene.missiles.length; i--;) {
				var missile = scene.missiles[i];

				if(Game.isCollision(enemy, missile)) {
					missile.explode();
					enemy.destroy();
					return true;
				}
			}
		},

		createObjects: function() {
			scene.missiles = [];
			scene.ship = new BlockBlaster.Ship({
				speed: 300,
				maxMissiles: 3,
				repeatRate: 30
			});
			scene.loadEnemies();
		},

		loadEnemies: function() {
			scene.enemies = [
				new BlockBlaster.Enemy(100, 25),
				new BlockBlaster.Enemy(250, 25),
				new BlockBlaster.Enemy(400, 25),
				new BlockBlaster.Enemy(550, 25),
				new BlockBlaster.Enemy(700, 25),
				new BlockBlaster.Enemy(100, 80, -1),
				new BlockBlaster.Enemy(250, 80, -1),
				new BlockBlaster.Enemy(400, 80, -1),
				new BlockBlaster.Enemy(550, 80, -1),
				new BlockBlaster.Enemy(700, 80, -1)
			];
		},

		updateShip: function() {
			scene.ship.respondToInput();
			scene.ship.move();
			scene.ship.draw();
		},

		updateEnemies: function() {
			var anyDestroyed = false;

			for (i = scene.enemies.length; i--;) {
				var enemy = scene.enemies[i];
				if(enemy.isDestroyed) {
					anyDestroyed = true;
					delete scene.enemies[i];
				} else {
					scene.checkCollisions(enemy);
					enemy.move();
					enemy.draw();
				}
			}

			if(anyDestroyed) {
				scene.enemies.clean();
				if(scene.enemies.length < 1) {
					scene.loadEnemies();
				}
			}
		},

		updateMissles: function() {
			for (var i = scene.missiles.length; i--;) {
				var missile = scene.missiles[i];
				if(missile.isLive) {
					missile.move();
					missile.draw();
				}
			}
		}
	};
})();