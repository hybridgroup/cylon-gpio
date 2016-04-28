"use strict";

var TP401 = lib("tp401");

describe("TP401", function() {
  var driver;

  beforeEach(function() {
    driver = new TP401({
      name: "sensor",
      connection: {},
      pin: 13
    });
  });

  describe("constructor", function() {
    var testDriver;

    beforeEach(function() {
      testDriver = new TP401({
        name: "sensor",
        connection: {},
        pin: 13
      });
    });

    it("assigns @pin to the passed pin", function() {
      expect(testDriver.pin).to.be.eql(13);
    });

    context("if no pin is specified", function() {
      it("throws an error", function() {
        var fn = function() { return new TP401({ name: "hi" }); };
        expect(fn).to.throw(
          "No pin specified for Analog Sensor. Cannot proceed"
        );
      });
    });
  });

  describe("#commands", function() {
    it("is an object containing TP401 commands", function() {
      for (var c in driver.commands) {
        expect(driver.commands[c]).to.be.a("function");
      }
    });
  });

  describe("#ppm", function() {
    it("returns the value of @ppm when 0", function() {
      driver.analogVal = 0;
      expect(driver.ppm()).to.be.eql(0);
    });

    it("returns a value of @ppm of around 13 when 512", function() {
      driver.analogVal = 512;
      expect(driver.ppm()).to.be.eql(13);
    });
  });
});
