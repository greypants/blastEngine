window.BLAST = window.BLAST || {};

(function(blast) {

	blast.Missile = function(ship) {
		this.init({
			width: 10,
			height: 20,
			speed: 300,
			vy: 0,
			y: 0,
			x: 0
		});
		this.ship = ship;
		blast.scene.missiles.push(this);
	};

	blast.Missile.prototype = new blast.Rectangle();

	blast.Missile.prototype.move = function(direction) {
		this.y -= this.vy * blast.frames.delta;
		if(this.y < (0 - this.height)){
			this.reload();
		}
	};

	blast.Missile.prototype.reload = function() {
		//fix this duplication
		this.x = this.ship.x + this.ship.width / 2 - this.width / 2;
		this.y = this.ship.y;
		this.isLive = false;
		this.ship.missiles.push(this);
	};

	blast.Missile.prototype.fire = function() {
		this.x = this.ship.x + this.ship.width / 2 - this.width / 2;
		this.y = this.ship.y;
		this.vy = this.speed;
		this.isLive = true;
		this.ship.missiles.shift();
	};

	blast.Missile.prototype.explode = function() {
		this.vy = 0;
		this.reload();
	};

})(window.BLAST);