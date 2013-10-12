SpaceBlaster.Missile = function(ship) {
	var properties = {
		image:  new Game.Image('images/missile.png'),
		width: 26,
		height: 46,
		speed: 900,
		vy: 0,
		y: ship.y,
		x: ship.x + ship.width / 2 - 26 / 2
	};

	this.set(properties);
	this.ship = ship;
	Game.scene.missiles.push(this);
};

SpaceBlaster.Missile.prototype = new Game.Object();

SpaceBlaster.Missile.prototype.drawType = function() {
	if(Game.debug) {

		// Show hit-area
		Game.ctx.fillStyle = 'red';
		Game.ctx.fillRect(0,0,this.width, this.height);
		Game.ctx.fill();
	}
	this.image.draw();
};

SpaceBlaster.Missile.prototype.explode = function() {
	// this.vy = 0;
	// this.reload();
};

SpaceBlaster.Missile.prototype.fire = function() {
	this.x = this.ship.x + this.ship.width / 2 - this.width / 2;
	this.y = this.ship.y;
	this.vy = this.speed;
	this.isLive = true;
	this.ship.missiles.shift();
};

SpaceBlaster.Missile.prototype.move = function(direction) {
	this.y -= this.vy * Game.frames.delta;
	if(this.y < (0 - this.height)){
		this.reload();
	}
};

SpaceBlaster.Missile.prototype.reload = function() {
	//fix this duplication
	this.x = -this.height;
	this.y = this.ship.y - this.height;
	this.isLive = false;
	this.ship.missiles.push(this);
};