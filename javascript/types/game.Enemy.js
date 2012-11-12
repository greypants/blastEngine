window.GAME = window.GAME || {};

(function(game) {

	game.Enemy = function(x, y, direction) {
		var properties = {
			image: new game.Image('images/enemy.png'),
			color: 'rgba(0, 0, 255, 0.25)',
			direction: direction || 1,
			height: 30,
			maxMissiles: 5,
			missiles: [],
			range: 50,
			speed: 100,
			vx: 100,
			width: 50,
			x: x + game.core.getRandomNumber(-25, 25),
			y: y,
			origin: {
				x: x,
				y: y
			}
		};
		this.set(properties);
	};

	game.Enemy.prototype = new game.Object();

	game.Enemy.prototype.destroy = function() {
		this.isHit = true;
		this.vy = -200;
		// this.isDestroyed = true;
	};

	game.Enemy.prototype.drawType = function() {
		if(game.debug) {
			if(this.isDestroyed) {
				this.color = 'red';
			}
			// Show hit-area
			game.ctx.fillStyle = this.color;
			game.ctx.fillRect(0,0,this.width, this.height);
			game.ctx.fill();
		}
		this.image.draw();
	};

	game.Enemy.prototype.move = function() {
		this.x += this.vx * this.direction * game.frames.delta;
		if(this.isHit) {
			this.y += this.vy * game.frames.delta;
			this.rotation += 20 * game.frames.delta;
			this.isDestroyed = this.y < -this.height;
		} else {
			if(this.x > this.origin.x + this.range) {
				this.direction = -1;
			} else if (this.x < this.origin.x - this.range) {
				this.direction = 1;
			}
		}
	};

})(window.GAME);