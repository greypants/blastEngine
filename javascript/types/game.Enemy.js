window.GAME = window.GAME || {};

(function(game) {

	game.Enemy = function(startX, direction) {
		var properties = {
			direction: direction || 1,
			height: 40,
			maxMissiles: 5,
			missiles: [],
			range: 50,
			speed: 100,
			vx: 100,
			width: 80,
			x: startX + game.core.getRandomNumber(-25, 25),
			y: 25,
			origin: {
				x: startX,
				y: 25
			}
		};
		this.init(properties);
	};

	game.Enemy.prototype = new game.Rectangle();

	game.Enemy.prototype.destroy = function() {
		var _this = this;
			_this.color = 'red';
		setTimeout(function(){
			_this.color = 'black';
		}, 500);
	};

	game.Enemy.prototype.move = function() {
		this.x += this.vx * this.direction * game.frames.delta;

		if(this.x > this.origin.x + this.range) {
			this.direction = -1;
		} else if (this.x < this.origin.x - this.range) {
			this.direction = 1;
		}
	};

})(window.GAME);