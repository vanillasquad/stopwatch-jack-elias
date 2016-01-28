var watchScript = new Stopwatch();

setInterval(function() {
    document.getElementById('display').innerHTML = watchScript.getFormattedTime();
}, 5);

document.getElementById('start-pause').addEventListener('click', function(){
    if (watchScript.isPaused()) {
        watchScript.start();
    } else {
        watchScript.pause();
    }
});

document.getElementById('reset').addEventListener('click', function(){
    if(watchScript.isPaused()){
        watchScript.reset();
    }
});
