window.GAME = window.GAME || {};

(function(game) {

	game.scenes = game.scenes || {};

	var scene = game.scenes.level_1 = {
		init: function() {
			scene.createObjects();
			game.frames.actions = [
				game.core.clearCanvas,
				scene.updateShip,
				scene.updateMissles,
				scene.updateEnemies
			];
		},

		checkCollisions: function(enemy) {
			for (var i = scene.missiles.length; i--;) {
				var missile = scene.missiles[i];

				if(game.core.isCollision(enemy, missile)) {
					missile.explode();
					enemy.destroy();
					return true;
				}
			}
		},

		checkKeys: function() {
			var leftIsDown = 37 in game.keysDown;
			var rightIsDown = 39 in game.keysDown;
			var spacebarIsDown = 32 in game.keysDown;

			if(!leftIsDown && !rightIsDown){
				scene.ship.vx = 0;
			}

			if(leftIsDown) {
				scene.ship.vx = scene.ship.speed * game.frames.delta * -1;
			}

			if(rightIsDown) {
				scene.ship.vx = scene.ship.speed * game.frames.delta;
			}

			if(spacebarIsDown) {
				scene.ship.fire();
			}
		},

		createObjects: function() {
			scene.missiles = [];
			scene.enemies = [
				new game.Enemy(100),
				new game.Enemy(400, -1),
				new game.Enemy(600)
			];
			scene.ship = new game.Ship();
		},

		updateShip: function() {
			scene.ship.move();
			scene.ship.draw();
		},

		updateEnemies: function() {
			for (i = scene.enemies.length; i--;) {
				var enemy = scene.enemies[i];
				scene.checkCollisions(enemy);
				enemy.move();
				enemy.draw();
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

})(window.GAME);