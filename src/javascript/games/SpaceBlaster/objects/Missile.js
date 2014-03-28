SpaceBlaster.Missile = Game.Object.extend({
	initialize: function(ship) {
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
	},

	drawType: function() {
		if(Game.debug) {
			// Show hit-area
			Game.ctx.fillStyle = 'red';
			Game.ctx.fillRect(0,0,this.width, this.height);
			Game.ctx.fill();
		}
		this.image.draw();
	},

	explode: function() {
		// this.vy = 0;
		// this.reload();
	},

	fire: function() {
		this.x = this.ship.x + this.ship.width / 2 - this.width / 2;
		this.y = this.ship.y;
		this.vy = this.speed;
		this.isLive = true;
		this.ship.missiles.shift();
	},

	move: function(direction) {
		this.y -= this.vy * Game.frames.delta;
		if(this.y < (0 - this.height)){
			this.reload();
		}
	},

	reload: function() {
		//fix this duplication
		this.x = -this.height;
		this.y = this.ship.y - this.height;
		this.isLive = false;
		this.ship.missiles.push(this);
	}
});
