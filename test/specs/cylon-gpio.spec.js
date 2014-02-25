"use strict";
var gpio = source("cylon-gpio");

describe("Cylon.Drivers.GPIO", function() {
  it("should be able to create led driver", function() {
    expect(gpio.driver({ name: 'led', device: {} })).to.be.a('object');
  });
});
