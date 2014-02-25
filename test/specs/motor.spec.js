"use strict";

var Motor = source("motor");

describe("Cylon.Drivers.GPIO.Motor", function() {
  var driver = new Motor({
    name: 'vrroom',
    device: {
      connection: 'connect',
      pin: 13
    }
  });

  describe('constructor', function() {
    it("sets @pin to the value of the passed device's pin", function() {
      expect(driver.pin).to.be.eql(13);
    });

    it("sets @speedvalue to 0 by default", function() {
      expect(driver.speedValue).to.be.eql(0);
    });

    it("sets @isOn to false by default", function() {
      expect(driver.isOn).to.be["false"];
    });
  });

  it('provides a list of motor commands', function() {
    var commands = ['turnOn', 'turnOff', 'toggle', 'speed', 'currentSpeed'];
    expect(driver.commands()).to.be.eql(commands);
  });

  describe("#turnOn", function() {
    it("writes a high value to the digital pin", function() {
      var connection = { digitalWrite: spy() };
      driver.connection = connection;

      driver.turnOn();

      expect(driver.isOn).to.be["true"];

      assert(connection.digitalWrite.calledOnce);
      assert(connection.digitalWrite.calledWith(13, 1));
    });
  });

  describe("#turnOff", function() {
    it("writes a low value to the digital pin", function() {
      var connection = { digitalWrite: spy() };
      driver.connection = connection;

      driver.turnOff();

      expect(driver.isOn).to.be["false"];

      assert(connection.digitalWrite.calledOnce);
      assert(connection.digitalWrite.calledWith(13, 0));
    });
  });

  describe("#toggle", function() {
    context("when @isOn is true", function() {
      it("turns the motor off", function() {
        var turnOff = sinon.stub(driver, 'turnOff');
        driver.isOn = true;

        driver.toggle();

        assert(turnOff.calledOnce);
      });
    });

    context("when @isOn is false", function() {
      it("turns the motor on", function() {
        var turnOn = sinon.stub(driver, 'turnOn');
        driver.isOn = false;

        driver.toggle();

        assert(turnOn.calledOnce);
      });
    });
  });

  describe("#currentSpeed", function() {
    it("returns the current @speedValue of the motor", function() {
      driver.speedValue = 120;

      expect(driver.currentSpeed()).to.be.eql(120);
    });
  });

  describe("#speed", function() {
    before(function() {
      var connection = { pwmWrite: spy() };
      driver.connection = connection;
      driver.speed(100);
    });

    it("writes the speed value to the pin via the connection", function() {
      assert(driver.connection.pwmWrite.calledOnce);
      assert(driver.connection.pwmWrite.calledWith(13, 100));
    });

    it("sets @speedValue to the passed value", function() {
      expect(driver.speedValue).to.be.eql(100);
    });

    it("sets @isOn depending on whether the speed is greater than 0", function() {
      expect(driver.isOn).to.be["true"];
      driver.speed(0);
      expect(driver.isOn).to.be["false"];
    });
  });
});
