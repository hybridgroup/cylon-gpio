"use strict";

var DirectPin = lib("direct-pin");

describe("DirectPin", function() {
  var driver;

  beforeEach(function() {
    driver = new DirectPin({
      name: "directPin",
      connection: {},
      pin: 5
    });
  });

  describe("constructor", function() {
    it("sets @pin to the passed pin", function() {
      expect(driver.pin).to.be.eql(5);
    });

    it("sets @readSet to false by default", function() {
      expect(driver.readSet).to.be.false;
    });

    it("sets @high to false by default", function() {
      expect(driver.high).to.be.false;
    });

    context("if no pin is specified", function() {
      it("throws an error", function() {
        var fn = function() { return new DirectPin({ name: "hi" }); };
        expect(fn).to.throw("No pin specified for Direct Pin. Cannot proceed");
      });
    });

    it("sets commands object with the following", function() {
      var commands = [
        "digital_read",
        "digital_write",
        "analog_read",
        "analog_write",
        "pwm_write",
        "servo_write"
      ];

      for (var c in commands) {
        expect(driver.commands[commands[c]]).to.be.a("function");
      }
    });
  });

  describe("#start", function() {
    var callback = spy();

    beforeEach(function() {
      driver.start(callback);
    });

    it("triggers the callback", function() {
      expect(callback).to.be.calledOnce;
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

  describe("#digitalWrite", function() {
    beforeEach(function() {
      driver.connection.digitalWrite = spy();
      driver.digitalWrite(1);
    });

    it("calls connection#digitalWrite with params", function() {
      expect(driver.connection.digitalWrite).to.be.calledWith(5, 1);
    });
  });

  describe("#digitalRead", function() {
    var callback = spy();

    beforeEach(function() {
      driver.connection.digitalRead = spy();
      driver.digitalRead(callback);
    });

    it("calls connection#digitalRead with params", function() {
      expect(driver.connection.digitalRead).to.be.calledWith(5, callback);
    });

    it("sets driver@readSet true", function() {
      expect(driver.readSet).to.be.eql(true);
    });
  });

  describe("#analogWrite", function() {
    beforeEach(function() {
      driver.connection.analogWrite = spy();
      driver.analogWrite(128);
    });

    it("calls connection#digitalWrite with params", function() {
      expect(driver.connection.analogWrite).to.be.calledWith(5, 128);
    });
  });

  describe("#analogRead", function() {
    var callback = spy();

    beforeEach(function() {
      driver.connection.analogRead = spy();
      driver.analogRead(callback);
    });

    it("calls connection#analogRead with params", function() {
      expect(driver.connection.analogRead).to.be.calledWith(5, callback);
    });

    it("sets driver@readSet true", function() {
      expect(driver.readSet).to.be.eql(true);
    });
  });

  describe("#servoWrite", function() {
    beforeEach(function() {
      driver.connection.servoWrite = spy();
      driver.servoWrite(90);
    });

    it("calls connection#servoWrite with params", function() {
      expect(driver.connection.servoWrite).to.be.calledWith(5, 90);
    });
  });

  describe("#pwmWrite", function() {
    beforeEach(function() {
      driver.connection.pwmWrite = spy();
      driver.pwmWrite(128);
    });

    it("calls connection#pwmWrite with params", function() {
      expect(driver.connection.pwmWrite).to.be.calledWith(5, 128);
    });
  });
});
