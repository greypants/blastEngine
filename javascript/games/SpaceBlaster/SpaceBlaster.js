var SpaceBlaster = {};

(function(){
	var scene = SpaceBlaster.initial = {
		init: function() {
			scene.elapsedTime = 0;
			scene.createObjects();

			// Push methods to run every frame
			Game.frames.actions = [
				Game.clearCanvas,
				scene.updateTime,
				scene.updateShip,
				scene.updateMissles,
				scene.updateEnemies
			];
		},

		checkCollisions: function(enemy) {
			// Enemies and missiles
			for (var i = scene.missiles.length; i--;) {
				var missile = scene.missiles[i];

				if(Game.isCollision(enemy, missile)) {
					missile.explode();
					!enemy.isHit && enemy.destroy();
					return true;
				}
			}

			// Enemies and ship
			if(Game.isCollision(enemy, scene.ship)) {
				scene.ship.die();
				// Reset Game
				Game.loadScene('initial');
			}
		},

		createObjects: function() {
			scene.missiles = [];
			scene.ship = new SpaceBlaster.Ship({
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
				var enemy = new SpaceBlaster.Enemy(x, y - Game.getRandomNumber(0, 100));
				enemy.original.vy = enemy.vy += (scene.elapsedTime * 50);
				scene.enemies.push(enemy);
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

		updateTime: function() {
			scene.elapsedTime += (Game.frames.delta / 10);
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