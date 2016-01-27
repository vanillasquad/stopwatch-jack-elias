var Stopwatch = function() {
    var time = 0;
    var _timeStart = 0;
    var intervalID;
    var paused = false;
    var pausedTime = 0;

    this.start = function() {
        //if not paused
        if(!paused){
            _timeStart = Date.now();

            intervalID = setInterval(function() {
                time = Date.now() - _timeStart;
            }, 5);
            return intervalID;
        } else {
            //restart will find a new '_timeStart'
            _timeStart = Date.now();

            intervalID = setInterval(function() {
                time = Date.now() - _timeStart + pausedTime;
            }, 5);
            paused = !paused;
            return intervalID;
        }
    };

    this.getTime = function() {
        return time;
    };

    this.pause = function() {
        paused = !paused;
        clearInterval(intervalID);
        pausedTime = time;
    };
    this.reset = function() {
        time = 0;
        _timeStart = 0;
        paused = false;
        pausedTime = 0;
    };

    this.getFormattedTime = function(){
        var iso = new Date(time).toISOString();
        return iso.slice(12, 23).replace('.', ':');
    };

};
