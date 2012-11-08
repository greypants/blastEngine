window.BLAST = window.BLAST || {};

(function(blast) {

	blast.Ship = function(data) {
		data = data || {
			x: 100,
			y: 100,
			width: 50,
			height: 50,
			speed: 300,
			vx: 0,
			maxMissiles: 5,
			missiles: []
		};

		data.x = blast.canvas.width/2 - data.width/2;
		data.y = blast.canvas.height - data.height -25;

		this.init(data);
		this.loadMissiles();
	};

	blast.Ship.prototype = new blast.Rectangle();

	blast.Ship.prototype.move = function(direction) {
		this.x += this.vx;
	};

	blast.Ship.prototype.loadMissiles = function() {
		var i = 0;
		while(i < this.maxMissiles) {
			this.missiles.push(new blast.Missile(this));
			i++;
		}
	};

	blast.Ship.prototype.fire = function() {
		if(this.missiles.length > 0) {
			var missile = this.missiles[0];
			missile.fire();
		} else {
			// console.log('out of ammo!');
		}
	};

	blast.Ship.prototype.die = function() {
		console.log('die!');
	};

})(window.BLAST);