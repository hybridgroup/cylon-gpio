"use strict";

var AnalogSensor = lib("analog-sensor");

describe("AnalogSensor", function() {
  var driver;

  beforeEach(function() {
    driver = new AnalogSensor({
      name: "sensor",
      connection: {},
      pin: 13
    });
  });

  describe("constructor", function() {
    var testDriver;

    beforeEach(function() {
      testDriver = new AnalogSensor({
        name: "sensor",
        connection: {},
        pin: 13,
        upperLimit: 180,
        lowerLimit: 50
      });
    });

    it("assigns @pin to the passed pin", function() {
      expect(testDriver.pin).to.be.eql(13);
    });

    it("assigns @upperlimit to the passed upper limit", function() {
      expect(testDriver.upperLimit).to.be.eql(180);
    });

    it("assigns @lowerlimit to the passed lower limit", function() {
      expect(testDriver.lowerLimit).to.be.eql(50);
    });

    it("assigns @upperlimit to 256 by default", function() {
      expect(driver.upperLimit).to.be.eql(256);
    });

    it("assigns @lowerlimit to 0 by default", function() {
      expect(driver.lowerLimit).to.be.eql(0);
    });

    it("assigns @analog_val to null by default", function() {
      expect(driver.lowerLimit).to.be.eql(0);
    });

    context("if no pin is specified", function() {
      it("throws an error", function() {
        var fn = function() { return new AnalogSensor({ name: "hi" }); };
        expect(fn).to.throw(
          "No pin specified for Analog Sensor. Cannot proceed"
        );
      });
    });
  });

  describe("#commands", function() {
    it("is an object containing AnalogSensor commands", function() {
      for (var c in driver.commands) {
        expect(driver.commands[c]).to.be.a("function");
      }
    });
  });

  describe("#start", function() {
    var callback = function() {};

    beforeEach(function() {
      driver.connection = { analogRead: stub().callsArgWith(1, null, 75) };
      driver.emit = spy();

      driver.start(callback);
    });

    it("tells the connection to #analogRead the pin", function() {
      expect(driver.connection.analogRead).to.be.calledWith(13);
    });

    it("sets @analogVal to the read value", function() {
      expect(driver.analogVal).to.be.eql(75);
    });

    it("emits the 'analogRead' event with the read value", function() {
      expect(driver.emit).to.be.calledWith("analogRead", 75);
    });

    context("when a value under the lower limit is read", function() {
      beforeEach(function() {
        driver.connection.analogRead.callsArgWith(1, null, -1);
        driver.start(callback);
      });

      it("emits the 'analogRead' event with the read value", function() {
        expect(driver.emit).to.be.calledWith("analogRead", -1);
      });

      it("emits the 'lowerLimit' event with the read value", function() {
        expect(driver.emit).to.be.calledWith("lowerLimit", -1);
      });
    });

    context("when a value above the upper limit is read", function() {
      beforeEach(function() {
        driver.connection.analogRead.callsArgWith(1, null, 360);
        driver.start(callback);
      });

      it("emits the 'analogRead' event with the read value", function() {
        expect(driver.emit).to.be.calledWith("analogRead", 360);
      });

      it("emits the 'upperLimit' event with the read value", function() {
        expect(driver.emit).to.be.calledWith("upperLimit", 360);
      });
    });
  });

  describe("#halt", function() {
    var callback = spy();

    beforeEach(function() {
      driver.halt(callback);
    });

    it("triggers the callback", function() {
      expect(callback).to.be.calledOnce;
    });
  });

  describe("#analogRead", function() {
    it("returns the value of @analogVal", function() {
      driver.analogVal = 128;
      expect(driver.analogRead()).to.be.eql(128);
    });
  });
});
