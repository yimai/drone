var RollingSpider = require("rolling-spider");
var temporal = require("temporal");

var ACTIVE = true;
var STEPS = 5;

var d = new RollingSpider({uuid:"Mambo_209381"});

d.connect(function () {
  d.setup(function () {
    console.log('Configured for Mambo! ', d.name);
    d.flatTrim();
    d.startPing();
    d.flatTrim();
    setTimeout(function () {
      console.log(d.name + ' => SESSION START');
      ACTIVE = true;

      temporal.queue(
        [
          {
            delay: 2000,
            task: function() {
              d.takeOff();
              console.log("order take off.");
            }
          },
          {
            delay: 2000,
            task: function() {
              var param = {tilt:0, forward:0, turn:0, up:20};
              d.drive(param, 30);
              console.log("up")
            }
          },
          {
            delay: 2000,
            task: function() {
              var param = {tilt:0, forward:45, turn:0, up:0};
              d.drive(param, 30);
              console.log("forward")
            }
          },
          {
            delay: 2000,
            task: function() {
              var param = {tilt:0, forward:0, turn:180, up:0};
              d.drive(param, 40);
              console.log("left turn")
            }
          },
          {
            delay: 2000,
            task: function() {
              d.land();
              console.log("order landing.");
            }
          },
          {
            delay: 500,
            task: function() {
              d.disconnect();
              console.log('finish.');
              temporal.clear();
              process.exit(0);
              console.log('exit.');
            }
          }
        ]
        );
    }, 1000);
  });
});