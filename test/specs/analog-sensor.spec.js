(function() {
  'use strict';
  var analogSensor;

  analogSensor = source("analog-sensor");

  describe("Cylon.Drivers.GPIO.AnalogSensor", function() {
    var button;
    button = new Cylon.Drivers.GPIO.AnalogSensor({
      name: 'sensor',
      device: {
        connection: 'connect',
        pin: 13
      }
    });
    return it("needs tests");
  });

}).call(this);
