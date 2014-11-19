"use strict";

var ContinuousServo = source("continuous-servo");

describe("ContinuousServo", function() {
  var driver;

  beforeEach(function() {
    driver = new ContinuousServo({
      name: 'serv',
      connection: { servoWrite: spy() },
      pin: 13
    });
  });

  describe("#constructor", function() {
    it("sets @pin to the provided pin", function() {
      expect(driver.pin).to.be.eql(13);
    });

    it("sets @angleValue to 0 by default", function() {
      expect(driver.angleValue).to.be.eql(0);
    });

    context("if no pin is specified", function() {
      it("throws an error", function() {
        var fn = function() { new ContinuousServo({ name: 'hi' }); };
        expect(fn).to.throw("No pin specified for Continuous Servo. Cannot proceed");
      });
    });
  });

  describe("#commands", function() {
    it("is an object containing ContinuousServo commands", function() {
      for (var c in driver.commands) {
        expect(driver.commands[c]).to.be.a('function');
      }
    });
  });

  describe("#stop", function() {
    it('writes a value of 90 to the servo', function() {
      driver.stop();
      expect(driver.connection.servoWrite).to.be.calledWith(13, 90);
    });
  });

  describe("#clockwise", function() {
    it('writes a value of 180 to the servo', function() {
      driver.clockwise();
      expect(driver.connection.servoWrite).to.be.calledWith(13, 180);
    });
  });

  describe("#counterClockwise", function() {
    it('writes a value of 180 to the servo', function() {
      driver.counterClockwise();
      expect(driver.connection.servoWrite).to.be.calledWith(13, 89);
    });
  });
});
