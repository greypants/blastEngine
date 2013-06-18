/* ---------------------------------------------------------------
    Date.now polyfil For IE8 and earlier version.
    Based on https://gist.github.com/1035932
   --------------------------------------------------------------- */

    Date.now || (Date.now = function() {
        return new Date().getTime();
    });