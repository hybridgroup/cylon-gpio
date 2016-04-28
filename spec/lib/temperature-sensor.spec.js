"use strict";

var TemperatureSensor = lib("temperature-sensor");

describe("TemperatureSensor", function() {
  var driver;

  beforeEach(function() {
    driver = new TemperatureSensor({
      name: "sensor",
      connection: {},
      pin: 13
    });
  });

  describe("constructor", function() {
    var testDriver;

    beforeEach(function() {
      testDriver = new TemperatureSensor({
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
        var fn = function() { return new TemperatureSensor({ name: "hi" }); };
        expect(fn).to.throw(
          "No pin specified for Analog Sensor. Cannot proceed"
        );
      });
    });
  });

  describe("#commands", function() {
    it("is an object containing TemperatureSensor commands", function() {
      for (var c in driver.commands) {
        expect(driver.commands[c]).to.be.a("function");
      }
    });
  });

  describe("#celsius", function() {
    it("returns the value of @celsius", function() {
      driver.analogVal = 512;
      expect(driver.celsius()).to.be.eql(25);
    });
  });
});
