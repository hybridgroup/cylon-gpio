(function() {
  'use strict';
  var servo;

  servo = source("servo");

  describe("Cylon.Drivers.GPIO.Servo", function() {
    var button;
    button = new Cylon.Drivers.GPIO.Servo({
      name: 'serv',
      device: {
        connection: 'connect',
        pin: 13
      }
    });
    return it("needs tests");
  });

}).call(this);
