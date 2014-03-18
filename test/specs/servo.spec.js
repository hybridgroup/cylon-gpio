"use strict";

source("servo");

describe("Cylon.Drivers.GPIO.Servo", function() {
  var driver = new Cylon.Drivers.GPIO.Servo({
    name: 'serv',
    device: {
      connection: { servoWrite: spy() },
      pin: 13
    }
  });

  describe("constructor", function() {
    it("sets @pin to the passed device's pin", function() {
      expect(driver.pin).to.be.eql(13);
    });

    it("sets @angleValue to 0 by default", function() {
      expect(driver.angleValue).to.be.eql(0);
    });

    context("if a servo range is supplied", function() {
      it("@angleRange is set to provided range", function() {
        var new_driver = new Cylon.Drivers.GPIO.Servo({
          name: 'serv',
          device: { connection: 'connect', pin: 13 },
          extraParams: { range: { min: 0, max: 180 } }
        });

        expect(new_driver.angleRange.min).to.be.eql(0);
        expect(new_driver.angleRange.max).to.be.eql(180);
      });
    });

    context("if no servo range is supplied", function() {
      it("@angleRange defaults to 30-150", function() {
        expect(driver.angleRange.min).to.be.eql(30);
        expect(driver.angleRange.max).to.be.eql(150);
      });
    });
  });

  describe("#commands", function() {
    var commands = driver.commands();
    it("provides an array of motor commands", function() {
      expect(commands).to.be.an('array');

      for (var i = 0; i < commands.length; i++) {
        expect(commands[i]).to.be.a('string');
      }
    });
  });

  describe('#currentAngle', function() {
    it("returns the current value of the servo's angle", function() {
      expect(driver.currentAngle()).to.be.eql(0);
      driver.angleValue = 10;
      expect(driver.currentAngle()).to.be.eql(10);
    });
  });

  describe("#angle", function() {
    var connection = null;
    var safeAngle = null;

    before(function() {
      stub(driver, 'safeAngle').returns(120);
      driver.angle(120);
    });

    after(function() {
      driver.safeAngle.restore();
    });

    it("ensures the value is safe", function() {
      expect(driver.safeAngle).to.be.calledWith(120);
    });

    it("writes the value to the servo", function() {
      expect(driver.connection.servoWrite).to.be.calledWith(13, 120);
    });

    it("sets @angleValue to the new servo value", function() {
      expect(driver.angleValue).to.be.eql(120);
    });
  });

  describe("#safeAngle", function() {
    before(function() {
      driver.angleRange = { min: 30, max: 130 };
    });

    context("when passed a value below the servo's range min", function() {
      it("returns the range's min value", function() {
        expect(driver.safeAngle(10)).to.be.eql(30);
      });
    });

    context("when passed a value above the servo's range max", function() {
      it("returns the range's max value", function() {
        expect(driver.safeAngle(180)).to.be.eql(130);
      });
    });

    context("when passed a value within the servo's range", function() {
      it("returns the value", function() {
        expect(driver.safeAngle(50)).to.be.eql(50);
      });
    });
  });
});
