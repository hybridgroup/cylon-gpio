(function() {
  'use strict';
  var led;

  led = source("led");

  describe("Cylon.Drivers.GPIO.Led", function() {
    var button;
    button = new Cylon.Drivers.GPIO.Led({
      name: 'blinky',
      device: {
        connection: 'connect',
        pin: 13
      }
    });
    return it("needs tests");
  });

}).call(this);
