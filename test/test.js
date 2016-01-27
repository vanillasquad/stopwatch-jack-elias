module("Interface Tests", {
    beforeEach: function() {
        this.watch = new Stopwatch();
    }
});

test( "object is created", function( assert ) {
    assert.ok( typeof this.watch == "object", "Created an object" );
});

test( "Stopwatch time defaults to zero", function( assert ) {
    assert.ok( this.watch.getTime() === 0, "Time is zero" );
});

test( "function named start exists", function( assert ) {
    assert.ok( typeof this.watch.start === 'function', "start function exists" );
});

test( "function named pause exists", function( assert ) {
    assert.ok( typeof this.watch.pause === 'function', "pause function exists" );
});

test( "function named reset exists", function( assert ) {
    assert.ok( typeof this.watch.reset === 'function', "reset function exists" );
});


module("Functionality Tests", {
    beforeEach: function(){
        this.watch = new Stopwatch();
    }
});

test( ".start triggers time", function( assert ) {
    var done = assert.async();
    var watch = this.watch;
    var interval = watch.start();

    setTimeout(function() {
        assert.ok( Math.abs(watch.getTime() - 50) < 10, "Timer has been triggered" );

        setTimeout(function(){
            clearInterval(interval);
        }, 50);

        done();
    }, 50);
});


test(".pause stops the timer running", function(assert) {
    var done = assert.async(2);
    var watch = this.watch;
    var interval = watch.start();

    setTimeout(function() {
        watch.pause();
        done();
    }, 50);

    setTimeout(function() {
        assert.ok( Math.abs(watch.getTime() - 50) < 10, "Time has been paused");
        done();
    }, 100);
});

// test("Check accuracy after 1 min",function(assert){
//     var watch = this.watch;
//     var done = assert.async();
//     var interval = watch.start();
//
//     setTimeout(function(){
//         assert.ok( Math.abs(watch.getTime() - 60000) < 10, "1 minute timer within 5ms");
//
//         setTimeout(function() {
//             clearInterval(interval);
//         }, 50);
//     },60000);
// });

test("Check restarting after pause resumes correctly", function(assert) {
    var watch = this.watch;
    var done = assert.async(3);
    var interval = watch.start();

    setTimeout(function() {
        watch.pause();
        var a = watch.getTime();
        done();
    }, 500);

    setTimeout(function() {
        watch.start();
        done();
    }, 1000);

    setTimeout(function() {
        var a = watch.getTime();
        assert.ok(Math.abs(a - 600) < 15, "Watch has restarted");
        done();
    }, 1100);
});

test("Check restarting after two pauses", function(assert){
    var watch = this.watch;
    var done = assert.async();
    var interval = watch.start();

    setTimeout(function(){
        watch.pause();
        var time = watch.getTime();
        console.log("After 1000 seconds, time is:", time);
    }, 1000);

    setTimeout(function(){
        watch.start();
        var time = watch.getTime();
        console.log("After 1100 seconds, time is:", time);
    }, 1100);

    setTimeout(function(){
        watch.pause();
        var time = watch.getTime();
        console.log("After 1500 seconds, time is:", time);
    }, 1500);

    setTimeout(function(){
        watch.start();
        var time = watch.getTime();
        console.log("After 1600 seconds, time is:", time);
    }, 1600);

    setTimeout(function(){
        var time = watch.getTime();
        console.log("After 2000 seconds, time is:", time);
        assert.ok(Math.abs(time - 1800) < 20, "error less than 20ms after 2 pauses");
        done();
    }, 2000);
});

test("Check can reset stopwatch", function(assert) {
    var watch = this.watch;
    var done = assert.async();
    var interval = watch.start();

    setTimeout(function() {
        watch.pause();
        assert.ok(Math.abs(watch.getTime() - 100) < 5, "Paused accurately");

        watch.reset();
        assert.ok(watch.getTime() === 0, "Reset accurately");

        done();
    }, 100);
});

test("Test getFormattedTime display", function(assert) {
    var watch = this.watch;
    assert.equal(watch.getFormattedTime(), '0:00:00:000');
});

test("Test getFormattedTime display", function(assert) {
    var watch = this.watch;
    var done = assert.async();
    var interval = watch.start();

    setTimeout(function() {
        assert.equal(watch.getFormattedTime(), '0:00:00:050');
    }, 50);

    setTimeout(function() {
        assert.equal(watch.getFormattedTime(), '0:00:01:000');
    }, 1000);

    // setTimeout(function() {
    //     assert.equal(watch.getFormattedTime(), '0:01:00:000');
    // }, 60000);
});

module("DOM Testing", {
    // beforeEach: function(){}
});

test("div container exists in DOM", function(assert){
    assert.expect(3);
    assert.ok(document.getElementById('display'));
    assert.ok(document.getElementById('start-pause'));
    assert.ok(document.getElementById('reset'));
});

test("Test content of display before stopwatch is started", function(assert) {
    assert.equal(document.getElementById('display').innerHTML, '0:00:00:00');
});

// test("Test clicking start-pause button starts timer", function(assert) {
//     document.getElementById('start-pause').click();
//     var done = assert.async();
//
//     setTimeout(function (){
//         assert.equal(, '0:00:00:01');
//     }, 1000);
//
// });






// test(".reset works", function(assert){});
