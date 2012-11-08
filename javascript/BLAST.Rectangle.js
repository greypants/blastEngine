window.BLAST = window.BLAST || {};

(function(blast) {

	blast.Rectangle = function() {

	};

	blast.Rectangle.prototype.init = function(data){
		for(var property in data) {
			this[property] = data[property];
		}
		this.color = this.color || 'black';
	};

	blast.Rectangle.prototype.draw = function() {
		blast.ctx.save();
		// blast.ctx.translate(this.x, this.y);
		// blast.ctx.rotate(this.rotation);
		// blast.ctx.scale(this.scaleX, this.scaleY);
		var x = (this.x + 0.5) | 0;
		var y = (this.y + 0.5) | 0;
		blast.ctx.fillStyle = this.color;
		// blast.ctx.beginPath();
		blast.ctx.fillRect(x,y,this.width, this.height);
		// blast.ctx.closePath();
		blast.ctx.fill();
		blast.ctx.restore();
	};

})(window.BLAST);