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
				speed: 400,
				maxMissiles: 3,
				repeatRate: 30
			});
			scene.loadEnemies(9);
		},

		loadEnemies: function(count) {
			scene.enemies = [];
			var x = 100;
			var y = -count * 100;
			var i = 0;

			while (i < count) {
				scene.enemies.push(new BlockBlaster.Enemy(x, y - Game.getRandomNumber(0, 100)));
				x += 200;
				y += 100;
				i++;
				if( x > Game.width - 200) {
					x = 100;
				}
			}
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
					scene.loadEnemies(9);
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