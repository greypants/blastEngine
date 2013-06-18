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