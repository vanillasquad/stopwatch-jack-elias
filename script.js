var watchScript = new Stopwatch();

//function run every 5ms starting on script load
setInterval(function() {
    document.getElementById('display').innerHTML = watchScript.getFormattedTime();
    var time = watchScript.getTime(); //total milliseconds elapsed

    //convert seconds (mod 1000) and minute (mod 60000) to degrees.
    //at the start of each second and minute, the variables will become 0.
    //final mod 360 ensures the screen flash
    var milliAngle = (360*(time%1000)/1000)%360;
    var secAngle = (360*(time%60000)/60000)%360;
    document.getElementById('hand').style.transform = "rotate("+secAngle+"deg)";
    document.getElementById('decihand').style.transform = "rotate("+milliAngle+"deg)";

    //for flashing whole screen every minute
    if( !watchScript.isPaused() && Math.round(secAngle) === 0 && time > 100){
        //if watch is not paused, second hand is at 0 degrees, not at start
        document.getElementsByTagName('body')[0].classList.add('flash');
        setTimeout(function() {
            document.getElementsByTagName('body')[0].classList.remove('flash');
        }, 200);
    }
    //flashing box every ten seconds
    if ( !watchScript.isPaused() && Math.round(secAngle) % 60 === 0 && time > 100) {
        document.getElementById('top').classList.add('flash');
        setTimeout(function() {
            document.getElementById('top').classList.remove('flash');
        }, 200);
    }

}, 5);

document.getElementById('start-pause').addEventListener('click', function(e){
    if (watchScript.isPaused()) {
        watchScript.start();
    } else {
        watchScript.pause();
    }

    if (this.innerHTML === 'Start') {
        this.innerHTML = 'Pause';
    } else if (this.innerHTML === 'Pause') {
        this.innerHTML = 'Start';
    }
});

document.getElementById('reset').addEventListener('click', function(e){
    if(watchScript.isPaused()){
        watchScript.reset();
    } else {
        watchScript.pause();
        watchScript.reset();
    }
});
