(function() {
  'use strict';
  var button;

  button = source("button");

  describe("Cylon.Drivers.GPIO.MakeyButton", function() {
    button = new Cylon.Drivers.GPIO.MakeyButton({
      name: 'button',
      device: {
        connection: 'connect',
        pin: 13
      }
    });
    return it("needs tests");
  });

}).call(this);
