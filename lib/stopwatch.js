var Stopwatch = function() {
    var time = 0;
    var _timeStart = 0;
    var intervalID;
    var paused = true;
    var pausedTime = 0;

    this.start = function() {
        if (! paused) {
            throw new Error("Must be started from paused state");
        }

        _timeStart = Date.now();

        intervalID = setInterval(function() {
            time = Date.now() - _timeStart + pausedTime;
        }, 5);
        paused = !paused;
        return intervalID;
    };

    this.getTime = function() {
        return time;
    };

    this.pause = function() {
        paused = true;
        clearInterval(intervalID);
        pausedTime = time;
    };

    this.isPaused = function() {
        return paused;
    };

    this.reset = function() {
        time = 0;
        _timeStart = 0;
        paused = true;
        pausedTime = 0;
    };

    this.getFormattedTime = function(){
        var iso = new Date(time).toISOString();
        return iso.slice(12, 22).replace('.', ':');
    };

};
