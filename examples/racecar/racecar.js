"use strict";
var Cylon = require("cylon");

Cylon.robot({
  connection: {
    edison: "intel-iot"
  },

  devices: [
    {name: "leftMotor", driver: "motor", pin: "5", directionPin: "4"},
    {name: "rightMotor", driver: "motor", pin: "6", directionPin: "7"},
  ],

  work: function(my) {
    my.leftMotor.forward(100);
    my.rightMotor.forward(100);
    after((5).seconds(), function() {
      my.leftMotor.speed(25);
    });
    after((10).seconds(), function() {
      my.leftMotor.speed(100);
      my.rightMotor.speed(25);
    });
    after((20).seconds(), function() {
      my.leftMotor.speed(100);
      my.rightMotor.speed(100);
    });
    after((25).seconds(), function() {
      my.leftMotor.turnOff();
      my.rightMotor.turnOff();
    });
  }
}).start();
