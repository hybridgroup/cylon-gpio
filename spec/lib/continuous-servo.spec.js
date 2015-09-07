"use strict";

var ContinuousServo = lib("continuous-servo");

describe("ContinuousServo", function() {
  var driver, callback;

  beforeEach(function() {
    callback = spy();
    driver = new ContinuousServo({
      name: "serv",
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
        var fn = function() { return new ContinuousServo({ name: "hi" }); };
        expect(fn).to.throw(
          "No pin specified for Continuous Servo. Cannot proceed"
        );
      });
    });
  });

  describe("#commands", function() {
    it("is an object containing ContinuousServo commands", function() {
      for (var c in driver.commands) {
        expect(driver.commands[c]).to.be.a("function");
      }
    });
  });

  describe("#stop", function() {
    it("writes a scaledValue of 0.5 (90 non scaled) to the servo", function() {
      driver.stop(callback);
      expect(driver.connection.servoWrite)
        .to.be.calledWith(13, 0.5, null, { min: 500, max: 2400 }, callback);
    });
  });

  describe("#rotate", function() {
    it("writes a scaled value of 1 when rotation is clockwise", function() {
      driver.rotate("clockwise");
      expect(driver.connection.servoWrite).to.be
        .calledWith(13, 1, null, { min: 500, max: 2400 });
    });

    it("writes a scaled value of 0.49 when counter-clockwise", function() {
      driver.rotate("counter-clockwise", callback);
      expect(driver.connection.servoWrite).to.be
        .calledWith(13, 0, null, { min: 500, max: 2400 });
    });
  });

  describe("#clockwise", function() {
    it("writes a scaled value of 1 to the servo", function() {
      driver.clockwise(callback);
      expect(driver.connection.servoWrite).to.be
        .calledWith(13, 1, null, { min: 500, max: 2400 }, callback);
    });
  });

  describe("#counterClockwise", function() {
    it("writes a scaled value of 0.49 to the servo", function() {
      driver.counterClockwise(callback);
      expect(driver.connection.servoWrite).to.be.calledWith(
        13,
        0,
        null,
        { min: 500, max: 2400 },
        callback
      );
    });
  });

  describe("#start", function() {
    var cb = spy();

    beforeEach(function() {
      driver.start(cb);
    });

    it("triggers the callback", function() {
      expect(cb).to.be.calledOnce;
    });
  });

  describe("#halt", function() {
    var cb = spy();

    beforeEach(function() {
      driver.halt(cb);
    });

    it("triggers the callback", function() {
      expect(cb).to.be.calledOnce;
    });
  });
});
