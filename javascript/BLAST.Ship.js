window.BLAST = window.BLAST || {};

(function(blast) {

	blast.Ship = function(data) {
		data = data || {
			x: 100,
			y: 100,
			width: 100,
			height: 100,
			speed: 300,
			vx: 0
		};

		this.init(data);
	};

	blast.Ship.prototype = new blast.Rectangle();

	blast.Ship.prototype.move = function(direction) {
		this.x += this.vx;
	};

	blast.Ship.prototype.fire = function() {
		console.log('fire!')
	};

	blast.Ship.prototype.die = function() {

	};

})(window.BLAST);