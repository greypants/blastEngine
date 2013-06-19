BlockBlaster.Ship = function(properties) {
	this.set(properties);
	this.setDefaults();
	this.loadMissiles();
};

BlockBlaster.Ship.prototype = new Game.Object();

BlockBlaster.Ship.prototype.setDefaults = function() {
	this.fireButtonReleased = true;
	this.image =  new Game.Image('images/ship.png'),
	this.missiles =  [],
	this.now = 0;
	this.then = 0;
	this.rotation = 0; // radians
	this.scale = 1;
	this.vx = 0;
	this.height = 160;
	this.width = 160;
	this.x = Game.canvas.width / 2 - this.width / 2;
	this.y = Game.canvas.height - this.height - 25;

	// User defineable settings
	this.speed = this.speed || 300;
	this.maxMissiles = this.maxMissiles || 3;
	this.repeatRate = this.repeatRate || 30;
};

BlockBlaster.Ship.prototype.respondToInput = function(){
	var pressed = Game.input.pressed;

	this.vx = 0;

	if(pressed.left) {
		this.vx = this.speed * Game.frames.delta * -1;
	}

	if(pressed.right) {
		this.vx = this.speed * Game.frames.delta;
	}

	if(pressed.spacebar) {
		this.fire();
	} else {
		this.fireButtonReleased = true;
	}
};

BlockBlaster.Ship.prototype.move = function(direction) {
	this.x += this.vx;
};

BlockBlaster.Ship.prototype.loadMissiles = function() {
	var i = 0;
	while(i < this.maxMissiles) {
		this.missiles.push(new BlockBlaster.Missile(this));
		i++;
	}
};

BlockBlaster.Ship.prototype.fire = function() {
	this.now = Game.frames.now;
	var fireDelta = (this.now - this.then)/1000;
	var missilesLoaded = this.missiles.length > 0;
	var gunIsCool = fireDelta > 1 / this.repeatRate;
	var readyToFire = gunIsCool && missilesLoaded && this.fireButtonReleased;

	if(readyToFire) {
		this.fireButtonReleased = false;
		this.missiles[0].fire();
		this.then = this.now;
	}
};

BlockBlaster.Ship.prototype.drawType = function() {
	if(Game.debug) {
		// Show hit-area
		Game.ctx.fillStyle = 'rgba(0, 0, 255, 0.25)';
		Game.ctx.fillRect(0,0,this.width, this.height);
		Game.ctx.fill();
	}
	this.image.draw();
},

BlockBlaster.Ship.prototype.die = function() {
	console.log('die!');
};
