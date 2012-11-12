window.GAME = window.GAME || {};

(function(game) {

	game.Enemy = function(startX, direction) {
		var properties = {
			image: new game.Image('/images/enemy.png'),
			color: 'rgba(0, 0, 255, 0.25)',
			direction: direction || 1,
			height: 30,
			maxMissiles: 5,
			missiles: [],
			range: 50,
			speed: 100,
			vx: 100,
			width: 50,
			x: startX + game.core.getRandomNumber(-25, 25),
			y: 25,
			origin: {
				x: startX,
				y: 25
			}
		};
		this.set(properties);
	};

	game.Enemy.prototype = new game.Object();

	game.Enemy.prototype.destroy = function() {
		var _this = this;
			_this.color = 'red';
		setTimeout(function(){
			_this.color = 'rgba(0, 0, 255, 0.25)';
		}, 500);
	};

	game.Enemy.prototype.drawType = function() {
		if(game.debug) {
			// Show hit-area
			game.ctx.fillStyle = this.color;
			game.ctx.fillRect(0,0,this.width, this.height);
			game.ctx.fill();
		}
		this.image.draw();
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