window.GAME = window.GAME || {};

(function(game) {

	game.Ship = function(properties) {
		this.set(properties);
		this.setDefaults();
		this.loadMissiles();
	};

	game.Ship.prototype = new game.Object();

	game.Ship.prototype.setDefaults = function() {
		this.fireButtonReleased = true;
		this.image =  new game.Image('images/ship.png'),
		this.missiles =  [],
		this.now = 0;
		this.then = 0;
		this.rotation = 0; // radians
		this.scale = 1;
		this.vx = 0;
		this.height = 50;
		this.width = 50;
		this.x = game.canvas.width / 2 - this.width / 2;
		this.y = game.canvas.height - this.height - 25;

		// User defineable settings
		this.speed = this.speed || 300;
		this.maxMissiles = this.maxMissiles || 3;
		this.repeatRate = this.repeatRate || 30;
	};

	game.Ship.prototype.respondToInput = function(){
		var pressed = game.input.pressed;

		this.vx = 0;

		if(pressed.left) {
			this.vx = this.speed * game.frames.delta * -1;
		}

		if(pressed.right) {
			this.vx = this.speed * game.frames.delta;
		}

		if(pressed.spacebar) {
			this.fire();
		} else {
			this.fireButtonReleased = true;
		}
	};

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
		this.now = game.frames.now;
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

	game.Ship.prototype.drawType = function() {
		if(game.debug) {
			// Show hit-area
			game.ctx.fillStyle = 'rgba(0, 0, 255, 0.25)';
			game.ctx.fillRect(0,0,this.width, this.height);
			game.ctx.fill();
		}
		this.image.draw();
	},

	game.Ship.prototype.die = function() {
		console.log('die!');
	};

})(window.GAME);