RUN_LONG_TESTS = false;

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

if (RUN_LONG_TESTS) {
    test("Check accuracy after 1 min",function(assert){
        var watch = this.watch;
        var done = assert.async();
        var interval = watch.start();

        setTimeout(function(){
            assert.ok( Math.abs(watch.getTime() - 60000) < 10, "1 minute timer within 5ms");

            setTimeout(function() {
                clearInterval(interval);
            }, 50);

            done();
        }, 60000);
    });
}

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
    }, 1000);

    setTimeout(function(){
        watch.start();
        var time = watch.getTime();
    }, 1100);

    setTimeout(function(){
        watch.pause();
        var time = watch.getTime();
    }, 1500);

    setTimeout(function(){
        watch.start();
        var time = watch.getTime();
    }, 1600);

    setTimeout(function(){
        var time = watch.getTime();
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
    var done = assert.async(2);
    var interval = watch.start();

    setTimeout(function() {
        var times = watch.getFormattedTime()
                        .match(/(\d+)/g)
                        .map(function(el) {
                            return parseInt(el, 10);
                        });
        assert.equal(times[0], 0); // hours
        assert.equal(times[1], 0); // minutes
        assert.equal(times[2], 0); // seconds
        assert.ok(Math.abs(times[3] - 50) < 5, "Passed"); // milliseconds
        done();
    }, 50);

    setTimeout(function() {
        var times = watch.getFormattedTime()
                        .match(/(\d+)/g)
                        .map(function(el) {
                            return parseInt(el, 10);
                        });

        assert.equal(times[0], 0); // hours
        assert.equal(times[1], 0); // minutes

        if (times[2]) {
            assert.ok(Math.abs(times[2] - 1) < 5, "Passed"); // seconds
            assert.equal(times[3], 0); // milliseconds
        } else {
            assert.ok(Math.abs(times[3] - 1000) < 10, "Passed"); // milliseconds
        }
        done();
    }, 1000);

    if (RUN_LONG_TESTS) {
        var done1 = assert.async();

        setTimeout(function() {
            var times = watch.getFormattedTime()
            .match(/(\d+)/g).map(function(el) {
                return parseInt(el, 10);
            });

            assert.equal(times[0], 0); // hours

            if (times[1]) {
                assert.equal(times[1], 1); // minutes
                assert.ok(times[2] < 5); // seconds
            } else {
                assert.ok(Math.abs(times[2] - 60) < 5, "Passed"); // seconds
                assert.ok(Math.abs(times[3] - 1000) < 5, "Passed"); // milliseconds
            }
            done1();
        }, 60000);
    }
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
