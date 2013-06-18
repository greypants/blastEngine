BlockBlaster.Missile = function(ship) {
	var properties = {
		width: 10,
		height: 20,
		speed: 300,
		vy: 0,
		y: 0,
		x: 0
	};

	this.set(properties);
	this.ship = ship;
	Game.scene.missiles.push(this);
};

BlockBlaster.Missile.prototype = new Game.Rectangle();

BlockBlaster.Missile.prototype.explode = function() {
	this.vy = 0;
	this.reload();
};

BlockBlaster.Missile.prototype.fire = function() {
	this.x = this.ship.x + this.ship.width / 2 - this.width / 2;
	this.y = this.ship.y;
	this.vy = this.speed;
	this.isLive = true;
	this.ship.missiles.shift();
};

BlockBlaster.Missile.prototype.move = function(direction) {
	this.y -= this.vy * Game.frames.delta;
	if(this.y < (0 - this.height)){
		this.reload();
	}
};

BlockBlaster.Missile.prototype.reload = function() {
	//fix this duplication
	this.x = -this.height;
	this.y = this.ship.y;
	this.isLive = false;
	this.ship.missiles.push(this);
};