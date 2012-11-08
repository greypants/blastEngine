window.BLAST = window.BLAST || {};

(function(blast) {

	blast.Enemy = function(startX, direction) {
		direction = direction || 1;
		this.init({
			direction: direction,
			height: 40,
			maxMissiles: 5,
			missiles: [],
			origin: {
				x: startX,
				y: 25
			},
			range: 50,
			speed: 100,
			vx: 0,
			width: 80,
			x: startX + blast.core.getRandomNumber(-25, 25),
			y: 25
		});
		// this.loadMissiles();
		this.vx = this.speed;
	};

	blast.Enemy.prototype = new blast.Rectangle();

	blast.Enemy.prototype.move = function() {
		this.x += this.vx * this.direction * blast.frames.delta;

		if(this.x > this.origin.x + this.range) {
			this.direction = -1;
		} else if (this.x < this.origin.x - this.range) {
			this.direction = 1;
		}
	};

	// blast.Enemy.prototype.loadMissiles = function() {
	//	var i = 0;
	//	while(i < this.maxMissiles) {
	//		this.missiles.push(new blast.Missile(this));
	//		i++;
	//	}
	// };

	// blast.Enemy.prototype.fire = function() {
	//	if(this.missiles.length > 0) {
	//		var missile = this.missiles[0];
	//		missile.fire();
	//	} else {
	//		// console.log('out of ammo!');
	//	}
	// };

	blast.Enemy.prototype.destroy = function() {
		var _this = this;
		console.log('Explode!');
		_this.color = 'red';
		setTimeout(function(){
			_this.color = 'black';
		}, 500);
	};

})(window.BLAST);