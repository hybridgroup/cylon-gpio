(function() {
  'use strict';
  var motor;

  motor = source("motor");

  describe("Cylon.Drivers.GPIO.Motor", function() {
    var button;
    button = new Cylon.Drivers.GPIO.Motor({
      name: 'vrroom',
      device: {
        connection: 'connect',
        pin: 13
      }
    });
    return it("needs tests");
  });

}).call(this);
