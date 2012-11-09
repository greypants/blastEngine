window.GAME = window.GAME || {};

(function(game) {

	game.Ship = function() {
		var properties = {
			x: 100,
			y: 100,
			width: 50,
			height: 50,
			speed: 300,
			vx: 0,
			maxMissiles: 5,
			missiles: []
		};

		properties.x = game.canvas.width/2 - properties.width/2;
		properties.y = game.canvas.height - properties.height -25;

		this.init(properties);
		this.loadMissiles();
	};

	game.Ship.prototype = new game.Rectangle();

	game.Ship.prototype.move = function(direction) {
		this.x += this.vx;
	};

	game.Ship.prototype.loadMissiles = function() {
		var i = 0;
		while(i < this.maxMissiles) {
			this.missiles.push(new game.Missile(this));
			i++;
		}
	};

	game.Ship.prototype.fire = function() {
		if(this.missiles.length > 0) {
			var missile = this.missiles[0];
			missile.fire();
		} else {
			// console.log('out of ammo!');
		}
	};

	game.Ship.prototype.die = function() {
		console.log('die!');
	};

})(window.GAME);