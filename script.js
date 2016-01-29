var watchScript = new Stopwatch();

setInterval(function() {
    document.getElementById('display').innerHTML = watchScript.getFormattedTime();
    var time = watchScript.getTime();
    var milliAngle = 360*(time%1000)/1000;
    var secAngle = (360*(time%60000)/60000)%360;
    document.getElementById('hand').style.transform = "rotate("+secAngle+"deg)";
    document.getElementById('decihand').style.transform = "rotate("+milliAngle+"deg)";
    if( !watchScript.isPaused() && Math.round(secAngle) === 0 && time > 100){

        document.getElementsByTagName('body')[0].classList.add('flash');
        setTimeout(function() {

            document.getElementsByTagName('body')[0].classList.remove('flash');
        }, 200);
    }

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
