"use strict";

var servo = source("servo");

describe("Cylon.Drivers.GPIO.ContinuousServo", function() {
  var driver = new Cylon.Drivers.GPIO.ContinuousServo({
    name: 'serv',
    device: {
      connection: 'connect',
      pin: 13
    }
  });

  it("needs tests");
});
