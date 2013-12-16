(function() {
  'use strict';
  var button;

  button = source("button");

  describe("Cylon.Drivers.GPIO.Button", function() {
    button = new Cylon.Drivers.GPIO.Button({
      name: 'button',
      device: {
        connection: 'connect',
        pin: 13
      }
    });
    return it("needs tests");
  });

}).call(this);
