window.BLAST = window.BLAST || {};

(function(blast) {

	blast.Rectangle = function() {

	};

	blast.Rectangle.prototype.init = function(data){
		for(var property in data) {
			this[property] = data[property];
		}
		this.color = this.color || 'black';
		this.rotation = this.rotation || 0;
		this.scale = this.scale || 1;
	};

	blast.Rectangle.prototype.draw = function() {
		// Round to whole pixel
		var x = (this.x + 0.5) | 0;
		var y = (this.y + 0.5) | 0;

		blast.ctx.save();
		blast.ctx.translate(this.x, this.y);
		blast.ctx.rotate(this.rotation);
		blast.ctx.scale(this.scaleX, this.scaleY);
		blast.ctx.fillStyle = this.color;
		blast.ctx.beginPath();
		blast.ctx.fillRect(0,0,this.width, this.height);
		blast.ctx.closePath();
		blast.ctx.fill();
		blast.ctx.restore();
	};

})(window.BLAST);