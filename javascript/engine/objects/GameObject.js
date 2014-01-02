(function() {
  window.GameObject = (function() {
    function GameObject() {}

    GameObject.prototype.initialize = function(properties) {
      if (properties) {
        return this.set(properties);
      }
    };

    GameObject.prototype.set = function(properties) {
      var property;
      for (property in properties) {
        this[property] = properties[property];
      }
      this.color = this.color || "black";
      this.rotation = this.rotation || 0;
      return this.scale = this.scale || 1;
    };

    GameObject.prototype.draw = function() {
      var x, y;
      Game.ctx.save();
      x = (this.x + 0.5) | 0;
      y = (this.y + 0.5) | 0;
      Game.ctx.translate(x + this.width / 2, y + this.height / 2);
      Game.ctx.rotate(this.rotation);
      Game.ctx.scale(this.scale, this.scale);
      Game.ctx.translate(-this.width / 2, -this.height / 2);
      if (typeof this.drawType === "function") {
        this.drawType();
      }
      return Game.ctx.restore();
    };

    return GameObject;

  })();

}).call(this);
