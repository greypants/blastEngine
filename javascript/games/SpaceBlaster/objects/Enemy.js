SpaceBlaster.Enemy = function(x, y, direction) {
	var properties = {
		image: new Game.Image('images/enemy.png'),
		color: 'rgba(0, 0, 255, 0.25)',
		direction: direction || 1,
		height: 81,
		maxMissiles: 5,
		missiles: [],
		range: 50,
		rotation: 0,
		isDestroyed: false,
		isHit: false,
		speed: 100,
		vx: 100,
		width: 97,
		x: x + Game.getRandomNumber(-25, 25),
		y: y - 181,
		vy: 100,
		origin: {
			x: x,
			y: y
		}
	};
	this.set(properties);
	this.destroySound = new Game.Sound('enemy-hit');
	this.original = properties;
};

SpaceBlaster.Enemy.prototype = new Game.Object();

SpaceBlaster.Enemy.prototype.destroy = function() {
	this.isHit = true;
	this.vy = -200;
	this.destroySound.play();
};

SpaceBlaster.Enemy.prototype.drawType = function() {
	if(Game.debug) {
		if(this.isDestroyed) {
			this.color = 'red';
		}
		// Show hit-area
		Game.ctx.fillStyle = this.color;
		Game.ctx.fillRect(0,0,this.width, this.height);
		Game.ctx.fill();
	}
	this.image.draw();
};

SpaceBlaster.Enemy.prototype.reset = function() {
	this.set(this.original);
	this.y = -this.height;
};

SpaceBlaster.Enemy.prototype.move = function() {
	this.x += this.vx * this.direction * Game.frames.delta;
	this.y += this.vy * Game.frames.delta;

	isOffscreen = (
		this.x > Game.width ||
		this.x < -this.width ||
		this.y > Game.height ||
		(this.isDestroyed && this.y < this.height)
	);

	if(this.isHit) {
		this.y += this.vy * Game.frames.delta;
		this.rotation += 20 * Game.frames.delta;
		this.isDestroyed = this.y < -this.height;
	} else {
		if(this.x > this.origin.x + this.range) {
			this.direction = -1;
		} else if (this.x < this.origin.x - this.range) {
			this.direction = 1;
		}
	}

	if(isOffscreen){
		this.reset();
	}
};
