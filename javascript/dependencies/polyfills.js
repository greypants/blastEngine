/* ---------------------------------------------------------------
    Date.now polyfil For IE8 and earlier version.
    Based on https://gist.github.com/1035932
   --------------------------------------------------------------- */

    Date.now || (Date.now = function() {
        return new Date().getTime();
    });

/* ---------------------------------------------------------------
    requestAnimationFrame polyfill by Erik Möller
    Fixes from Paul Irish and Tino Zijdel
    http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    --------------------------------------------------------------- */

    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];

        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

/* ---------------------------------------------------------------
    Array cleaner removes specfied value from array. In this case,
    I'm using it to remove 'undefined' objects in the array.
    http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
    --------------------------------------------------------------- */

    Array.prototype.clean = function(deleteValue) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == deleteValue) {
                this.splice(i, 1);
                i--;
            }
        }
        return this;
    };