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
			missiles: [],
			repeatRate: 50 // Missiles per second
		};

		properties.x = game.canvas.width/2 - properties.width/2;
		properties.y = game.canvas.height - properties.height -25;

		this.init(properties);
		this.now = 0;
		this.then = 0;
		this.fireButtonReleased = true;
		this.loadMissiles();
	};

	game.Ship.prototype = new game.Rectangle();

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

	game.Ship.prototype.die = function() {
		console.log('die!');
	};

})(window.GAME);