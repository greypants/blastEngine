(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BlastEngine, engine;

BlastEngine = require('./spaceBlaster');

engine = new BlastEngine();


},{"./spaceBlaster":12}],2:[function(require,module,exports){
module.exports = {
  Canvas: require('./objects/Canvas'),
  Controller: require('./objects/Controller'),
  DisplayObject: require('./objects/DisplayObject'),
  Frames: require('./objects/Frames'),
  Graphic: require('./objects/Graphic'),
  Inputs: require('./objects/Inputs'),
  Rectangle: require('./objects/Rectangle'),
  Sound: require('./objects/Sound')
};


},{"./objects/Canvas":3,"./objects/Controller":4,"./objects/DisplayObject":5,"./objects/Frames":6,"./objects/Graphic":7,"./objects/Inputs":8,"./objects/Rectangle":9,"./objects/Sound":10}],3:[function(require,module,exports){
var Canvas;

Canvas = (function() {
  function Canvas(_arg) {
    this.height = _arg.height, this.width = _arg.width, this.id = _arg.id;
    this.create();
    this.append();
  }

  Canvas.prototype.append = function() {
    var element;
    element = document.getElementById(this.id) || document.body;
    return element.appendChild(this.el);
  };

  Canvas.prototype.clear = function(dimensions) {
    var height, width, x, y;
    x = 0;
    y = 0;
    width = this.width;
    height = this.height;
    if (dimensions) {
      x = dimensions.x - 1;
      y = dimensions.y - 1;
      width = dimensions.width + 2;
      height = dimensions.height + 2;
    }
    return this.ctx.clearRect(x, y, width, height);
  };

  Canvas.prototype.create = function() {
    this.el = document.createElement("canvas");
    this.ctx = this.el.getContext("2d");
    this.ctx.width = this.el.width = this.width;
    return this.ctx.height = this.el.height = this.height;
  };

  return Canvas;

})();

module.exports = Canvas;


},{}],4:[function(require,module,exports){

/*
Controller.coffee
-----------
Instantiates a game controller containing access to
inputs, frames, the stage, and scene methods
 */
var Canvas, Controller, Frames, Inputs;

Canvas = require('./Canvas');

Inputs = require('./Inputs');

Frames = require('./Frames');

Controller = (function() {
  function Controller(options) {
    this.options = options;
    this.init();
  }

  Controller.prototype.init = function() {
    this.frames = new Frames();
    this.stage = new Canvas(this.options.stage);
    return this.inputs = new Inputs(this.options.inputs);
  };

  Controller.prototype.reset = function() {
    return this.init();
  };

  return Controller;

})();

module.exports = Controller;


},{"./Canvas":3,"./Frames":6,"./Inputs":8}],5:[function(require,module,exports){
var DisplayObject;

DisplayObject = (function() {
  DisplayObject.prototype.color = "blue";

  DisplayObject.prototype.height = 100;

  DisplayObject.prototype.rotation = 0;

  DisplayObject.prototype.scale = 1;

  DisplayObject.prototype.width = 100;

  DisplayObject.prototype.x = 0;

  DisplayObject.prototype.y = 0;

  DisplayObject.prototype.vx = 0;

  DisplayObject.prototype.vy = 0;

  function DisplayObject(ctx, properties) {
    this.ctx = ctx;
    if (properties) {
      this.set(properties);
    }
  }

  DisplayObject.prototype.extendWith = function(properties) {
    var property, _results;
    _results = [];
    for (property in properties) {
      _results.push(this[property] = properties[property]);
    }
    return _results;
  };

  DisplayObject.prototype.draw = function() {
    var x, y;
    this.ctx.save();
    x = (this.x += this.vx) + 0.5 | 0;
    y = (this.y += this.vy) + 0.5 | 0;
    this.ctx.translate(x + this.width / 2, y + this.height / 2);
    this.ctx.rotate(this.rotation);
    this.ctx.scale(this.scale, this.scale);
    this.ctx.translate(-this.width / 2, -this.height / 2);
    this.drawType && this.drawType();
    return this.ctx.restore();
  };

  return DisplayObject;

})();

module.exports = DisplayObject;


},{}],6:[function(require,module,exports){
var Frames,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Frames = (function() {
  function Frames() {
    this.play = __bind(this.play, this);
    this.pause = __bind(this.pause, this);
    this.loop = __bind(this.loop, this);
    this.delta = 0;
    window.addEventListener("blur", this.pause, false);
    window.addEventListener("focus", this.play, false);
  }

  Frames.prototype.update = function() {};

  Frames.prototype.loop = function() {
    this.setDelta();
    this.update();
    return this.animationFrame = window.requestAnimationFrame(this.loop);
  };

  Frames.prototype.pause = function() {
    window.cancelAnimationFrame(this.animationFrame);
    return this.isPlaying = false;
  };

  Frames.prototype.play = function() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.then = Date.now();
      return this.loop();
    }
  };

  Frames.prototype.setDelta = function() {
    this.now = Date.now();
    this.delta = (this.now - this.then) / 1000;
    return this.then = this.now;
  };

  return Frames;

})();

module.exports = Frames;


},{}],7:[function(require,module,exports){
var DisplayObject, Graphic,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DisplayObject = require('./DisplayObject');

Graphic = (function(_super) {
  __extends(Graphic, _super);

  function Graphic(ctx, src, options) {
    this.ctx = ctx;
    this.src = src;
    this.extendWith(options);
    this.createImage();
    this.load();
  }

  Graphic.prototype.createImage = function() {
    this.image = new Image();
    return this.image.setAttribute('src', this.src);
  };

  Graphic.prototype.drawType = function() {
    if (this.ready) {
      return this.ctx.drawImage(this.image, 0, 0);
    } else {
      return this.image.onload = (function(_this) {
        return function() {
          _this.ready = true;
          return _this.draw;
        };
      })(this);
    }
  };

  Graphic.prototype.load = function() {
    this.ready = false;
    this.image = new Image();
    this.image.src = this.src;
    return this.image.onload = (function(_this) {
      return function() {
        return _this.ready = true;
      };
    })(this);
  };

  return Graphic;

})(DisplayObject);

module.exports = Graphic;


},{"./DisplayObject":5}],8:[function(require,module,exports){
var Inputs,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Inputs = (function() {
  function Inputs(keys) {
    this.keys = keys;
    this.keyup = __bind(this.keyup, this);
    this.keydown = __bind(this.keydown, this);
    this.pressed = {};
    this.events = {};
    window.addEventListener("keyup", this.keyup);
    window.addEventListener("keydown", this.keydown);
  }

  Inputs.prototype.on = function(events, callback) {
    var event, _results;
    if (typeof this.events === 'object') {
      _results = [];
      for (event in events) {
        _results.push(this.events[event] = events[event]);
      }
      return _results;
    } else if (typeof this.events === 'string') {
      return this.events[event] = callback;
    }
  };

  Inputs.prototype.trigger = function(fullEvent) {
    var baseEvent, childEvent, segments, _base, _base1;
    segments = fullEvent.split(':');
    baseEvent = segments[0];
    childEvent = segments[1];
    if (typeof (_base = this.events)[fullEvent] === "function") {
      _base[fullEvent]();
    }
    if (childEvent) {
      return typeof (_base1 = this.events)[baseEvent] === "function" ? _base1[baseEvent](childEvent) : void 0;
    }
  };

  Inputs.prototype.keydown = function(event) {
    var code, input;
    code = event.keyCode;
    input = this.keys[code];
    if (input && input.state !== 'down') {
      event.preventDefault();
      input.state = 'down';
      return this.trigger("" + input.name + ":down");
    }
  };

  Inputs.prototype.keyup = function(event) {
    var code, input;
    code = event.keyCode;
    input = this.keys[code];
    if (input) {
      input.state = 'up';
      return this.trigger("" + input.name + ":up");
    }
  };

  return Inputs;

})();

module.exports = Inputs;


},{}],9:[function(require,module,exports){
var DisplayObject, Rectangle,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DisplayObject = require('./DisplayObject');

Rectangle = (function(_super) {
  __extends(Rectangle, _super);

  function Rectangle(ctx, properties) {
    Rectangle.__super__.constructor.call(this, ctx, properties);
  }

  Rectangle.prototype.drawType = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.width, this.height);
    return this.ctx.fill();
  };

  return Rectangle;

})(DisplayObject);

module.exports = Rectangle;


},{"./DisplayObject":5}],10:[function(require,module,exports){
var Sound,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Sound = (function() {
  Sound.prototype.fileTypes = ["ogg", "mp3"];

  function Sound(src, loops) {
    this.src = src;
    this.addSource = __bind(this.addSource, this);
    this.isEnabled = true;
    this.createAudioElement(loops);
    this.fileTypes.forEach(this.addSource);
    !loops & this.changePlayStateOnEnded();
  }

  Sound.prototype.addSource = function(extention) {
    var source;
    source = document.createElement("source");
    source.setAttribute('src', "" + this.src + "." + extention);
    source.setAttribute('type', "audio/" + extention);
    return this.audio.appendChild(source);
  };

  Sound.prototype.createAudioElement = function(loops) {
    this.audio = document.createElement("audio");
    this.audio.preload = "auto";
    return this.audio.loop = !!loops;
  };

  Sound.prototype.changePlayStateOnEnded = function() {
    return this.audio.addEventListener("ended", (function(_this) {
      return function() {
        return _this.isPlaying = false;
      };
    })(this), false);
  };

  Sound.prototype.disable = function() {
    this.audio.pause();
    return this.isEnabled = false;
  };

  Sound.prototype.enable = function() {
    this.isEnabled = true;
    return this.resume();
  };

  Sound.prototype.play = function() {
    if (this.isEnabled) {
      this.isPlaying = true;
      clearTimeout(this.playTimeout);
      if (this.audio.readyState > 1) {
        this.audio.currentTime = 0;
        return this.audio.play();
      } else {
        return this.playTimeout = setTimeout((function(_this) {
          return function() {
            return _this.play();
          };
        })(this), 20);
      }
    }
  };

  Sound.prototype.pause = function() {
    this.audio.pause();
    return this.isPlaying = false;
  };

  Sound.prototype.resume = function() {
    if (this.isEnabled && this.isPlaying) {
      return this.audio.play();
    }
  };

  Sound.prototype.stop = function() {
    if (this.audio.readyState > 1) {
      this.audio.pause();
      this.audio.currentTime = 0;
      return this.isPlaying = false;
    }
  };

  return Sound;

})();

module.exports = Sound;


},{}],11:[function(require,module,exports){
var Controller, controller;

Controller = require('./blastEngine/objects/Controller');

controller = new Controller({
  stage: {
    height: 675,
    width: 1200,
    id: 'canvas-wrapper'
  },
  inputs: {
    32: {
      name: 'spacebar'
    },
    37: {
      name: 'left'
    },
    39: {
      name: 'right'
    }
  }
});

module.exports = controller;


},{"./blastEngine/objects/Controller":4}],12:[function(require,module,exports){
var Game, Ship, controller, frames, inputs, stage;

Ship = require('./objects/Ship');

controller = require('./controller');

frames = controller.frames;

stage = controller.stage;

inputs = controller.inputs;

Game = (function() {
  function Game() {
    var ship;
    ship = new Ship(controller);
    frames.update = function() {
      stage.clear();
      return ship.draw();
    };
    inputs.on({
      spacebar: ship.fire,
      left: ship.moveLeft,
      right: ship.moveRight
    });
    frames.play();
  }

  return Game;

})();

module.exports = Game;


},{"./controller":11,"./objects/Ship":13}],13:[function(require,module,exports){
var Ship, blastEngine,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

blastEngine = require('../blastEngine');

Ship = (function(_super) {
  __extends(Ship, _super);

  Ship.prototype.fireButtonReleased = true;

  Ship.prototype.height = 160;

  Ship.prototype.maxMissiles = 3;

  Ship.prototype.missiles = [];

  Ship.prototype.now = 0;

  Ship.prototype.repeatRate = 30;

  Ship.prototype.speed = 300;

  Ship.prototype.then = 0;

  Ship.prototype.vx = 0;

  Ship.prototype.width = 160;

  function Ship(_arg, options) {
    this.stage = _arg.stage, this.frames = _arg.frames;
    this.fire = __bind(this.fire, this);
    this.moveRight = __bind(this.moveRight, this);
    this.moveLeft = __bind(this.moveLeft, this);
    this.ctx = this.stage.ctx;
    if (options) {
      this.extendWith(options);
    }
    this.setProperties();
    this.centerOnScreen();
  }

  Ship.prototype.centerOnScreen = function() {
    this.x = this.stage.width / 2 - this.width / 2;
    return this.y = this.stage.height - this.height - 25;
  };

  Ship.prototype.setProperties = function() {
    this.image = new blastEngine.Graphic(this.stage.ctx, "images/ship.png");
    this.laserSound = new blastEngine.Sound("audio/laser");
    this.explodeSound = new blastEngine.Sound("audio/explode");
    return this.thrust = {
      left: 0,
      right: 0
    };
  };

  Ship.prototype.moveLeft = function(state) {
    if (state === 'down') {
      this.thrust.left = this.speed * this.frames.delta;
      return this.vx -= this.thrust.left;
    } else if (state === 'up') {
      return this.vx += this.thrust.left;
    }
  };

  Ship.prototype.moveRight = function(state) {
    if (state === 'down') {
      this.thrust.right = this.speed * this.frames.delta;
      return this.vx += this.thrust.right;
    } else if (state === 'up') {
      return this.vx -= this.thrust.right;
    }
  };

  Ship.prototype.loadMissiles = function() {
    var i, _results;
    i = 0;
    _results = [];
    while (i < this.maxMissiles) {
      this.missiles.push(new Missile(this));
      _results.push(i++);
    }
    return _results;
  };

  Ship.prototype.fire = function(state) {
    if (state === 'down') {
      return this.laserSound.play();
    }
  };

  Ship.prototype.drawType = function() {
    return this.image.draw();
  };

  Ship.prototype.die = function() {
    return this.explodeSound.play();
  };

  return Ship;

})(blastEngine.DisplayObject);

module.exports = Ship;


},{"../blastEngine":2}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvYmxhc3RFbmdpbmUvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9ncmV5cGFudHMvQ29kZS9ibGFzdEVuZ2luZS9zcmMvamF2YXNjcmlwdC9hcHAuY29mZmVlIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2JsYXN0RW5naW5lL3NyYy9qYXZhc2NyaXB0L3NwYWNlQmxhc3Rlci9ibGFzdEVuZ2luZS9pbmRleC5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvYmxhc3RFbmdpbmUvc3JjL2phdmFzY3JpcHQvc3BhY2VCbGFzdGVyL2JsYXN0RW5naW5lL29iamVjdHMvQ2FudmFzLmNvZmZlZSIsIi9Vc2Vycy9ncmV5cGFudHMvQ29kZS9ibGFzdEVuZ2luZS9zcmMvamF2YXNjcmlwdC9zcGFjZUJsYXN0ZXIvYmxhc3RFbmdpbmUvb2JqZWN0cy9Db250cm9sbGVyLmNvZmZlZSIsIi9Vc2Vycy9ncmV5cGFudHMvQ29kZS9ibGFzdEVuZ2luZS9zcmMvamF2YXNjcmlwdC9zcGFjZUJsYXN0ZXIvYmxhc3RFbmdpbmUvb2JqZWN0cy9EaXNwbGF5T2JqZWN0LmNvZmZlZSIsIi9Vc2Vycy9ncmV5cGFudHMvQ29kZS9ibGFzdEVuZ2luZS9zcmMvamF2YXNjcmlwdC9zcGFjZUJsYXN0ZXIvYmxhc3RFbmdpbmUvb2JqZWN0cy9GcmFtZXMuY29mZmVlIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2JsYXN0RW5naW5lL3NyYy9qYXZhc2NyaXB0L3NwYWNlQmxhc3Rlci9ibGFzdEVuZ2luZS9vYmplY3RzL0dyYXBoaWMuY29mZmVlIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2JsYXN0RW5naW5lL3NyYy9qYXZhc2NyaXB0L3NwYWNlQmxhc3Rlci9ibGFzdEVuZ2luZS9vYmplY3RzL0lucHV0cy5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvYmxhc3RFbmdpbmUvc3JjL2phdmFzY3JpcHQvc3BhY2VCbGFzdGVyL2JsYXN0RW5naW5lL29iamVjdHMvUmVjdGFuZ2xlLmNvZmZlZSIsIi9Vc2Vycy9ncmV5cGFudHMvQ29kZS9ibGFzdEVuZ2luZS9zcmMvamF2YXNjcmlwdC9zcGFjZUJsYXN0ZXIvYmxhc3RFbmdpbmUvb2JqZWN0cy9Tb3VuZC5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvYmxhc3RFbmdpbmUvc3JjL2phdmFzY3JpcHQvc3BhY2VCbGFzdGVyL2NvbnRyb2xsZXIuY29mZmVlIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2JsYXN0RW5naW5lL3NyYy9qYXZhc2NyaXB0L3NwYWNlQmxhc3Rlci9pbmRleC5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvYmxhc3RFbmdpbmUvc3JjL2phdmFzY3JpcHQvc3BhY2VCbGFzdGVyL29iamVjdHMvU2hpcC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLG1CQUFBOztBQUFBLFdBQUEsR0FBYyxPQUFBLENBQVEsZ0JBQVIsQ0FBZCxDQUFBOztBQUFBLE1BQ0EsR0FBYSxJQUFBLFdBQUEsQ0FBQSxDQURiLENBQUE7Ozs7QUNBQSxNQUFNLENBQUMsT0FBUCxHQUNDO0FBQUEsRUFBQSxNQUFBLEVBQWdCLE9BQUEsQ0FBUSxrQkFBUixDQUFoQjtBQUFBLEVBQ0EsVUFBQSxFQUFnQixPQUFBLENBQVEsc0JBQVIsQ0FEaEI7QUFBQSxFQUVBLGFBQUEsRUFBZ0IsT0FBQSxDQUFRLHlCQUFSLENBRmhCO0FBQUEsRUFHQSxNQUFBLEVBQWdCLE9BQUEsQ0FBUSxrQkFBUixDQUhoQjtBQUFBLEVBSUEsT0FBQSxFQUFnQixPQUFBLENBQVEsbUJBQVIsQ0FKaEI7QUFBQSxFQUtBLE1BQUEsRUFBZ0IsT0FBQSxDQUFRLGtCQUFSLENBTGhCO0FBQUEsRUFNQSxTQUFBLEVBQWdCLE9BQUEsQ0FBUSxxQkFBUixDQU5oQjtBQUFBLEVB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LElBQWQsQ0FBQSxFQURJO0VBQUEsQ0F2RUwsQ0FBQTs7Y0FBQTs7R0FEa0IsV0FBVyxDQUFDLGNBRi9CLENBQUE7O0FBQUEsTUE2RU0sQ0FBQyxPQUFQLEdBQWlCLElBN0VqQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJCbGFzdEVuZ2luZSA9IHJlcXVpcmUgJy4vc3BhY2VCbGFzdGVyJ1xuZW5naW5lID0gbmV3IEJsYXN0RW5naW5lKClcbiIsIm1vZHVsZS5leHBvcnRzID1cblx0Q2FudmFzICAgICAgICA6IHJlcXVpcmUgJy4vb2JqZWN0cy9DYW52YXMnXG5cdENvbnRyb2xsZXIgICAgOiByZXF1aXJlICcuL29iamVjdHMvQ29udHJvbGxlcidcblx0RGlzcGxheU9iamVjdCA6IHJlcXVpcmUgJy4vb2JqZWN0cy9EaXNwbGF5T2JqZWN0J1xuXHRGcmFtZXMgICAgICAgIDogcmVxdWlyZSAnLi9vYmplY3RzL0ZyYW1lcydcblx0R3JhcGhpYyAgICAgICA6IHJlcXVpcmUgJy4vb2JqZWN0cy9HcmFwaGljJ1xuXHRJbnB1dHMgICAgICAgIDogcmVxdWlyZSAnLi9vYmplY3RzL0lucHV0cydcblx0UmVjdGFuZ2xlICAgICA6IHJlcXVpcmUgJy4vb2JqZWN0cy9SZWN0YW5nbGUnXG5cdFNvdW5kICAgICAgICAgOiByZXF1aXJlICcuL29iamVjdHMvU291bmQnXG4iLCJjbGFzcyBDYW52YXNcblx0Y29uc3RydWN0b3I6ICh7IEBoZWlnaHQsIEB3aWR0aCwgQGlkIH0pIC0+XG5cdFx0QGNyZWF0ZSgpXG5cdFx0QGFwcGVuZCgpXG5cblx0YXBwZW5kOiAtPlxuXHRcdGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChAaWQpIG9yIGRvY3VtZW50LmJvZHlcblx0XHRlbGVtZW50LmFwcGVuZENoaWxkKEBlbClcblxuXHRjbGVhcjogKGRpbWVuc2lvbnMpIC0+XG5cdFx0eCA9IDBcblx0XHR5ID0gMFxuXHRcdHdpZHRoID0gQHdpZHRoXG5cdFx0aGVpZ2h0ID0gQGhlaWdodFxuXG5cdFx0aWYgZGltZW5zaW9uc1xuXHRcdFx0eCA9IGRpbWVuc2lvbnMueCAtIDFcblx0XHRcdHkgPSBkaW1lbnNpb25zLnkgLSAxXG5cdFx0XHR3aWR0aCA9IGRpbWVuc2lvbnMud2lkdGggKyAyXG5cdFx0XHRoZWlnaHQgPSBkaW1lbnNpb25zLmhlaWdodCArIDJcblxuXHRcdEBjdHguY2xlYXJSZWN0IHgsIHksIHdpZHRoLCBoZWlnaHRcblxuXHRjcmVhdGU6IC0+XG5cdFx0QGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKVxuXHRcdEBjdHggPSBAZWwuZ2V0Q29udGV4dChcIjJkXCIpXG5cdFx0QGN0eC53aWR0aCA9IEBlbC53aWR0aCA9IEB3aWR0aFxuXHRcdEBjdHguaGVpZ2h0ID0gQGVsLmhlaWdodCA9IEBoZWlnaHRcblxubW9kdWxlLmV4cG9ydHMgPSBDYW52YXMiLCIjIyNcbkNvbnRyb2xsZXIuY29mZmVlXG4tLS0tLS0tLS0tLVxuSW5zdGFudGlhdGVzIGEgZ2FtZSBjb250cm9sbGVyIGNvbnRhaW5pbmcgYWNjZXNzIHRvXG5pbnB1dHMsIGZyYW1lcywgdGhlIHN0YWdlLCBhbmQgc2NlbmUgbWV0aG9kc1xuIyMjXG5cbkNhbnZhcyAgICA9IHJlcXVpcmUgJy4vQ2FudmFzJ1xuSW5wdXRzICAgID0gcmVxdWlyZSAnLi9JbnB1dHMnXG5GcmFtZXMgICAgPSByZXF1aXJlICcuL0ZyYW1lcydcblxuY2xhc3MgQ29udHJvbGxlclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zKSAtPlxuXHRcdEBpbml0KClcblxuXHRpbml0OiAtPlxuXHRcdEBmcmFtZXMgPSBuZXcgRnJhbWVzKClcblx0XHRAc3RhZ2UgPSAgbmV3IENhbnZhcyBAb3B0aW9ucy5zdGFnZVxuXHRcdEBpbnB1dHMgPSBuZXcgSW5wdXRzIEBvcHRpb25zLmlucHV0c1xuXG5cdHJlc2V0OiAtPlxuXHRcdCMgQHRlYXJkb3duKClcblx0XHRAaW5pdCgpXG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gQ29udHJvbGxlciIsImNsYXNzIERpc3BsYXlPYmplY3Rcblx0Y29sb3I6IFwiYmx1ZVwiXG5cdGhlaWdodDogMTAwXG5cdHJvdGF0aW9uOiAwXG5cdHNjYWxlOiAxXG5cdHdpZHRoOiAxMDBcblx0eDogMFxuXHR5OiAwXG5cdHZ4OiAwXG5cdHZ5OiAwXG5cblx0Y29uc3RydWN0b3I6IChAY3R4LCBwcm9wZXJ0aWVzKSAtPlxuXHRcdEBzZXQgcHJvcGVydGllcyBpZiBwcm9wZXJ0aWVzXG5cblx0ZXh0ZW5kV2l0aDogKHByb3BlcnRpZXMpIC0+XG5cdFx0Zm9yIHByb3BlcnR5IG9mIHByb3BlcnRpZXNcblx0XHRcdHRoaXNbcHJvcGVydHldID0gcHJvcGVydGllc1twcm9wZXJ0eV1cblxuXHRkcmF3OiAtPlxuXHRcdEBjdHguc2F2ZSgpXG5cblx0XHQjIFJvdW5kIHRvIHdob2xlIHBpeGVsXG5cdFx0eCA9IChAeCArPSBAdngpICsgMC41IHwgMFxuXHRcdHkgPSAoQHkgKz0gQHZ5KSArIDAuNSB8IDBcblxuXHRcdCMgQXBwbHkgVHJhbnNmb3JtYXRpb25zIChzY2FsZSBhbmQgcm90YXRlIGZyb20gY2VudGVyKVxuXHRcdEBjdHgudHJhbnNsYXRlIHggKyBAd2lkdGggLyAyLCB5ICsgQGhlaWdodCAvIDJcblx0XHRAY3R4LnJvdGF0ZSBAcm90YXRpb25cblx0XHRAY3R4LnNjYWxlIEBzY2FsZSwgQHNjYWxlXG5cdFx0QGN0eC50cmFuc2xhdGUgLUB3aWR0aCAvIDIsIC1AaGVpZ2h0IC8gMlxuXG5cdFx0IyBDYWxsIGV4dGVuZGVkIE9iamVjdCBUeXBlJ3MgZHJhdyBtZXRob2Rcblx0XHRAZHJhd1R5cGUgYW5kIEBkcmF3VHlwZSgpXG5cdFx0QGN0eC5yZXN0b3JlKClcblxubW9kdWxlLmV4cG9ydHMgPSBEaXNwbGF5T2JqZWN0IiwiY2xhc3MgRnJhbWVzXG5cdGNvbnN0cnVjdG9yOiAtPlxuXHRcdEBkZWx0YSA9IDBcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciBcImJsdXJcIiwgQHBhdXNlLCBmYWxzZVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwiZm9jdXNcIiwgQHBsYXksIGZhbHNlXG5cblx0dXBkYXRlOiAtPiAjIE92ZXJ3cml0ZSB3aXRoIGdhbWUgZmlsZVxuXG5cdGxvb3A6ID0+XG5cdFx0QHNldERlbHRhKClcblx0XHRAdXBkYXRlKClcblx0XHRAYW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIEBsb29wXG5cblx0cGF1c2U6ID0+XG5cdFx0d2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIEBhbmltYXRpb25GcmFtZVxuXHRcdEBpc1BsYXlpbmcgPSBmYWxzZVxuXG5cdHBsYXk6ID0+XG5cdFx0dW5sZXNzIEBpc1BsYXlpbmdcblx0XHRcdEBpc1BsYXlpbmcgPSB0cnVlXG5cdFx0XHRAdGhlbiA9IERhdGUubm93KClcblx0XHRcdEBsb29wKClcblxuXHRzZXREZWx0YTogLT5cblx0XHRAbm93ID0gRGF0ZS5ub3coKVxuXHRcdEBkZWx0YSA9IChAbm93IC0gQHRoZW4pIC8gMTAwMCAjIHNlY29uZHMgc2luY2UgbGFzdCBmcmFtZVxuXHRcdEB0aGVuID0gQG5vd1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZyYW1lcyIsIkRpc3BsYXlPYmplY3QgPSByZXF1aXJlKCcuL0Rpc3BsYXlPYmplY3QnKVxuXG5jbGFzcyBHcmFwaGljIGV4dGVuZHMgRGlzcGxheU9iamVjdFxuXHRjb25zdHJ1Y3RvcjogKEBjdHgsIEBzcmMsIG9wdGlvbnMpIC0+XG5cdFx0QGV4dGVuZFdpdGgob3B0aW9ucylcblx0XHRAY3JlYXRlSW1hZ2UoKVxuXHRcdEBsb2FkKClcblxuXHRjcmVhdGVJbWFnZTogLT5cblx0XHRAaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuXHRcdEBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIEBzcmMpXG5cblx0ZHJhd1R5cGU6IC0+XG5cdFx0aWYgQHJlYWR5XG5cdFx0XHRAY3R4LmRyYXdJbWFnZSBAaW1hZ2UsIDAsIDBcblx0XHRlbHNlXG5cdFx0XHRAaW1hZ2Uub25sb2FkID0gPT5cblx0XHRcdFx0QHJlYWR5ID0gdHJ1ZVxuXHRcdFx0XHRAZHJhd1xuXG5cdGxvYWQ6IC0+XG5cdFx0QHJlYWR5ID0gZmFsc2Vcblx0XHRAaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuXHRcdEBpbWFnZS5zcmMgPSBAc3JjXG5cdFx0QGltYWdlLm9ubG9hZCA9ID0+IEByZWFkeSA9IHRydWVcblxubW9kdWxlLmV4cG9ydHMgPSBHcmFwaGljXG4iLCJjbGFzcyBJbnB1dHNcblx0Y29uc3RydWN0b3I6IChAa2V5cykgLT5cblx0XHRAcHJlc3NlZCA9IHt9XG5cdFx0QGV2ZW50cyA9IHt9XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIgXCJrZXl1cFwiLCBAa2V5dXBcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciBcImtleWRvd25cIiwgQGtleWRvd25cblxuXHRvbjogKGV2ZW50cywgY2FsbGJhY2spIC0+XG5cdFx0aWYgdHlwZW9mIEBldmVudHMgaXMgJ29iamVjdCdcblx0XHRcdGZvciBldmVudCBvZiBldmVudHNcblx0XHRcdFx0QGV2ZW50c1tldmVudF0gPSBldmVudHNbZXZlbnRdXG5cblx0XHRlbHNlIGlmIHR5cGVvZiBAZXZlbnRzIGlzICdzdHJpbmcnXG5cdFx0XHRAZXZlbnRzW2V2ZW50XSA9IGNhbGxiYWNrXG5cblx0dHJpZ2dlcjogKGZ1bGxFdmVudCkgLT5cblx0XHRzZWdtZW50cyA9IGZ1bGxFdmVudC5zcGxpdCgnOicpO1xuXHRcdGJhc2VFdmVudCA9IHNlZ21lbnRzWzBdXG5cdFx0Y2hpbGRFdmVudCA9IHNlZ21lbnRzWzFdXG5cblx0XHRAZXZlbnRzW2Z1bGxFdmVudF0/KClcblxuXHRcdGlmIGNoaWxkRXZlbnRcblx0XHRcdEBldmVudHNbYmFzZUV2ZW50XT8oY2hpbGRFdmVudClcblxuXHRrZXlkb3duOiAoZXZlbnQpID0+XG5cdFx0Y29kZSA9IGV2ZW50LmtleUNvZGVcblx0XHRpbnB1dCA9IEBrZXlzW2NvZGVdXG5cdFx0aWYgaW5wdXQgYW5kIGlucHV0LnN0YXRlIGlzbnQgJ2Rvd24nXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRpbnB1dC5zdGF0ZSA9ICdkb3duJ1xuXHRcdFx0QHRyaWdnZXIoXCIje2lucHV0Lm5hbWV9OmRvd25cIilcblxuXHRrZXl1cDogKGV2ZW50KSA9PlxuXHRcdGNvZGUgPSBldmVudC5rZXlDb2RlXG5cdFx0aW5wdXQgPSBAa2V5c1tjb2RlXVxuXHRcdGlmIGlucHV0XG5cdFx0XHRpbnB1dC5zdGF0ZSA9ICd1cCdcblx0XHRcdEB0cmlnZ2VyKFwiI3tpbnB1dC5uYW1lfTp1cFwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0cyIsIkRpc3BsYXlPYmplY3QgPSByZXF1aXJlKCcuL0Rpc3BsYXlPYmplY3QnKVxuXG5jbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0XG4gIGNvbnN0cnVjdG9yOiAoY3R4LCBwcm9wZXJ0aWVzKSAtPlxuICAgIHN1cGVyIGN0eCwgcHJvcGVydGllc1xuXG4gIGRyYXdUeXBlOiAtPlxuICAgIEBjdHguZmlsbFN0eWxlID0gQGNvbG9yXG4gICAgQGN0eC5maWxsUmVjdCAwLCAwLCBAd2lkdGgsIEBoZWlnaHRcbiAgICBAY3R4LmZpbGwoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlY3RhbmdsZSIsImNsYXNzIFNvdW5kXG5cdGZpbGVUeXBlczogW1wib2dnXCIsIFwibXAzXCJdXG5cblx0Y29uc3RydWN0b3I6IChAc3JjLCBsb29wcykgLT5cblx0XHRAaXNFbmFibGVkID0gdHJ1ZVxuXHRcdEBjcmVhdGVBdWRpb0VsZW1lbnQgbG9vcHNcblx0XHRAZmlsZVR5cGVzLmZvckVhY2ggQGFkZFNvdXJjZVxuXHRcdG5vdCBsb29wcyAmIEBjaGFuZ2VQbGF5U3RhdGVPbkVuZGVkKClcblxuXHRhZGRTb3VyY2U6IChleHRlbnRpb24pID0+XG5cdFx0c291cmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNvdXJjZVwiKVxuXHRcdHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIFwiI3tAc3JjfS4je2V4dGVudGlvbn1cIilcblx0XHRzb3VyY2Uuc2V0QXR0cmlidXRlICd0eXBlJywgXCJhdWRpby8je2V4dGVudGlvbn1cIlxuXHRcdEBhdWRpby5hcHBlbmRDaGlsZCBzb3VyY2VcblxuXHRjcmVhdGVBdWRpb0VsZW1lbnQ6IChsb29wcykgLT5cblx0XHRAYXVkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXVkaW9cIilcblx0XHRAYXVkaW8ucHJlbG9hZCA9IFwiYXV0b1wiXG5cdFx0QGF1ZGlvLmxvb3AgPSAhIWxvb3BzXG5cblx0Y2hhbmdlUGxheVN0YXRlT25FbmRlZDogLT5cblx0XHRAYXVkaW8uYWRkRXZlbnRMaXN0ZW5lciBcImVuZGVkXCIsID0+XG5cdFx0XHRAaXNQbGF5aW5nID0gZmFsc2Vcblx0XHQsIGZhbHNlXG5cblx0ZGlzYWJsZTogLT5cblx0XHRAYXVkaW8ucGF1c2UoKVxuXHRcdEBpc0VuYWJsZWQgPSBmYWxzZVxuXG5cdGVuYWJsZTogLT5cblx0XHRAaXNFbmFibGVkID0gdHJ1ZVxuXHRcdEByZXN1bWUoKVxuXG5cdHBsYXk6IC0+XG5cdFx0aWYgQGlzRW5hYmxlZFxuXHRcdFx0QGlzUGxheWluZyA9IHRydWVcblx0XHRcdGNsZWFyVGltZW91dCBAcGxheVRpbWVvdXRcblx0XHRcdGlmIEBhdWRpby5yZWFkeVN0YXRlID4gMVxuXHRcdFx0XHRAYXVkaW8uY3VycmVudFRpbWUgPSAwXG5cdFx0XHRcdEBhdWRpby5wbGF5KClcblx0XHRcdGVsc2Vcblx0XHRcdFx0QHBsYXlUaW1lb3V0ID0gc2V0VGltZW91dCg9PlxuXHRcdFx0XHRcdEBwbGF5KClcblx0XHRcdFx0LCAyMClcblxuXHRwYXVzZTogLT5cblx0XHRAYXVkaW8ucGF1c2UoKVxuXHRcdEBpc1BsYXlpbmcgPSBmYWxzZVxuXG5cdHJlc3VtZTogLT5cblx0XHRAYXVkaW8ucGxheSgpICBpZiBAaXNFbmFibGVkIGFuZCBAaXNQbGF5aW5nXG5cblx0c3RvcDogLT5cblx0XHRpZiBAYXVkaW8ucmVhZHlTdGF0ZSA+IDFcblx0XHRcdEBhdWRpby5wYXVzZSgpXG5cdFx0XHRAYXVkaW8uY3VycmVudFRpbWUgPSAwXG5cdFx0XHRAaXNQbGF5aW5nID0gZmFsc2VcblxubW9kdWxlLmV4cG9ydHMgPSBTb3VuZFxuIiwiQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYmxhc3RFbmdpbmUvb2JqZWN0cy9Db250cm9sbGVyJylcblxuY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyXG5cdHN0YWdlOlxuXHRcdGhlaWdodDogNjc1XG5cdFx0d2lkdGg6IDEyMDBcblx0XHRpZDogJ2NhbnZhcy13cmFwcGVyJ1xuXG5cdGlucHV0czpcblx0XHQzMjogeyBuYW1lOiAnc3BhY2ViYXInIH1cblx0XHQzNzogeyBuYW1lOiAnbGVmdCcgfVxuXHRcdDM5OiB7IG5hbWU6ICdyaWdodCcgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRyb2xsZXIiLCJTaGlwID0gcmVxdWlyZSgnLi9vYmplY3RzL1NoaXAnKVxuY29udHJvbGxlciA9IHJlcXVpcmUoJy4vY29udHJvbGxlcicpXG5mcmFtZXMgPSBjb250cm9sbGVyLmZyYW1lc1xuc3RhZ2UgPSBjb250cm9sbGVyLnN0YWdlXG5pbnB1dHMgPSBjb250cm9sbGVyLmlucHV0c1xuXG5jbGFzcyBHYW1lXG5cdGNvbnN0cnVjdG9yOiAtPlxuXHRcdHNoaXAgPSBuZXcgU2hpcChjb250cm9sbGVyKVxuXG5cdFx0ZnJhbWVzLnVwZGF0ZSA9IC0+XG5cdFx0XHRzdGFnZS5jbGVhcigpXG5cdFx0XHRzaGlwLmRyYXcoKVxuXG5cdFx0aW5wdXRzLm9uXG5cdFx0XHRzcGFjZWJhcjogc2hpcC5maXJlXG5cdFx0XHRsZWZ0OiBzaGlwLm1vdmVMZWZ0XG5cdFx0XHRyaWdodDogc2hpcC5tb3ZlUmlnaHRcblxuXHRcdGZyYW1lcy5wbGF5KClcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lIiwiYmxhc3RFbmdpbmUgPSByZXF1aXJlICcuLi9ibGFzdEVuZ2luZSdcblxuY2xhc3MgU2hpcCBleHRlbmRzIGJsYXN0RW5naW5lLkRpc3BsYXlPYmplY3Rcblx0ZmlyZUJ1dHRvblJlbGVhc2VkOiB0cnVlXG5cdGhlaWdodDogMTYwXG5cdG1heE1pc3NpbGVzOiAzXG5cdG1pc3NpbGVzOiBbXVxuXHRub3c6IDBcblx0cmVwZWF0UmF0ZTogMzBcblx0c3BlZWQ6IDMwMFxuXHR0aGVuOiAwXG5cdHZ4OiAwXG5cdHdpZHRoOiAxNjBcblxuXHRjb25zdHJ1Y3RvcjogKHtAc3RhZ2UsIEBmcmFtZXN9LCBvcHRpb25zKSAtPlxuXHRcdEBjdHggPSBAc3RhZ2UuY3R4XG5cdFx0aWYgb3B0aW9uc1xuXHRcdFx0QGV4dGVuZFdpdGggb3B0aW9uc1xuXHRcdEBzZXRQcm9wZXJ0aWVzKClcblx0XHRAY2VudGVyT25TY3JlZW4oKVxuXHRcdCMgQGxvYWRNaXNzaWxlcygpXG5cblx0Y2VudGVyT25TY3JlZW46IC0+XG5cdFx0QHggPSBAc3RhZ2Uud2lkdGggLyAyIC0gQHdpZHRoIC8gMlxuXHRcdEB5ID0gQHN0YWdlLmhlaWdodCAtIEBoZWlnaHQgLSAyNVxuXG5cdHNldFByb3BlcnRpZXM6IC0+XG5cdFx0QGltYWdlID0gbmV3IGJsYXN0RW5naW5lLkdyYXBoaWMoQHN0YWdlLmN0eCwgXCJpbWFnZXMvc2hpcC5wbmdcIilcblx0XHRAbGFzZXJTb3VuZCA9IG5ldyBibGFzdEVuZ2luZS5Tb3VuZChcImF1ZGlvL2xhc2VyXCIpXG5cdFx0QGV4cGxvZGVTb3VuZCA9IG5ldyBibGFzdEVuZ2luZS5Tb3VuZChcImF1ZGlvL2V4cGxvZGVcIilcblx0XHRAdGhydXN0ID1cblx0XHRcdGxlZnQ6IDBcblx0XHRcdHJpZ2h0OiAwXG5cdFx0IyBVc2VyIGRlZmluZWFibGUgc2V0dGluZ3NcblxuXHRtb3ZlTGVmdDogKHN0YXRlKSA9PlxuXHRcdGlmIHN0YXRlIGlzICdkb3duJ1xuXHRcdFx0QHRocnVzdC5sZWZ0ID0gQHNwZWVkICogQGZyYW1lcy5kZWx0YVxuXHRcdFx0QHZ4IC09IEB0aHJ1c3QubGVmdFxuXHRcdGVsc2UgaWYgc3RhdGUgaXMgJ3VwJ1xuXHRcdFx0QHZ4ICs9IEB0aHJ1c3QubGVmdFxuXG5cdG1vdmVSaWdodDogKHN0YXRlKSA9PlxuXHRcdGlmIHN0YXRlIGlzICdkb3duJ1xuXHRcdFx0QHRocnVzdC5yaWdodCA9IEBzcGVlZCAqIEBmcmFtZXMuZGVsdGFcblx0XHRcdEB2eCArPSBAdGhydXN0LnJpZ2h0XG5cdFx0ZWxzZSBpZiBzdGF0ZSBpcyAndXAnXG5cdFx0XHRAdnggLT0gQHRocnVzdC5yaWdodFxuXG5cdGxvYWRNaXNzaWxlczogLT5cblx0XHRpID0gMFxuXHRcdHdoaWxlIGkgPCBAbWF4TWlzc2lsZXNcblx0XHRcdEBtaXNzaWxlcy5wdXNoIG5ldyBNaXNzaWxlKEApXG5cdFx0XHRpKytcblxuXHRmaXJlOiAoc3RhdGUpID0+XG5cdFx0aWYgc3RhdGUgaXMgJ2Rvd24nXG5cdFx0XHRAbGFzZXJTb3VuZC5wbGF5KClcblxuXHRcdCMgQGZpcmVCdXR0b25SZWxlYXNlZCA9IHRydWVcblx0XHQjIEBub3cgPSBAZnJhbWVzLm5vd1xuXHRcdCMgZmlyZURlbHRhID0gKEBub3cgLSBAdGhlbikgLyAxMDAwXG5cdFx0IyBtaXNzaWxlc0xvYWRlZCA9IEBtaXNzaWxlcy5sZW5ndGggPiAwXG5cdFx0IyBndW5Jc0Nvb2wgPSBmaXJlRGVsdGEgPiAxIC8gQHJlcGVhdFJhdGVcblx0XHQjIHJlYWR5VG9GaXJlID0gZ3VuSXNDb29sIGFuZCBtaXNzaWxlc0xvYWRlZCBhbmQgQGZpcmVCdXR0b25SZWxlYXNlZFxuXHRcdCMgaWYgcmVhZHlUb0ZpcmVcblx0XHQjIFx0QGxhc2VyU291bmQucGxheSgpXG5cdFx0IyBcdEBmaXJlQnV0dG9uUmVsZWFzZWQgPSBmYWxzZVxuXHRcdCMgXHRAbWlzc2lsZXNbMF0uZmlyZSgpXG5cdFx0IyBcdEB0aGVuID0gQG5vd1xuXG5cdGRyYXdUeXBlOiAtPlxuXHRcdEBpbWFnZS5kcmF3KClcblxuXHRkaWU6IC0+XG5cdFx0QGV4cGxvZGVTb3VuZC5wbGF5KClcblxubW9kdWxlLmV4cG9ydHMgPSBTaGlwXG4iXX0=
