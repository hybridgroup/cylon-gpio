(function() {
  'use strict';
  var Motor;

  Motor = source("motor");

  describe("Cylon.Drivers.GPIO.Motor", function() {
    var driver, spy;
    driver = new Motor({
      name: 'vrroom',
      device: {
        connection: 'connect',
        pin: 13
      }
    });
    spy = sinon.spy;
    describe('constructor', function() {
      it("sets @pin to the value of the passed device's pin", function() {
        return expect(driver.pin).to.be.eql(13);
      });
      it("sets @speedvalue to 0 by default", function() {
        return expect(driver.speedValue).to.be.eql(0);
      });
      return it("sets @isOn to false by default", function() {
        return expect(driver.isOn).to.be["false"];
      });
    });
    it('provides a list of motor commands', function() {
      var commands;
      commands = ['turnOn', 'turnOff', 'toggle', 'speed', 'currentSpeed'];
      return expect(driver.commands()).to.be.eql(commands);
    });
    describe("#turnOn", function() {
      return it("writes a high value to the digital pin", function() {
        var connection;
        connection = {
          digitalWrite: spy()
        };
        driver.connection = connection;
        driver.turnOn();
        expect(driver.isOn).to.be["true"];
        assert(connection.digitalWrite.calledOnce);
        return assert(connection.digitalWrite.calledWith(13, 1));
      });
    });
    describe("#turnOff", function() {
      return it("writes a low value to the digital pin", function() {
        var connection;
        connection = {
          digitalWrite: spy()
        };
        driver.connection = connection;
        driver.turnOff();
        expect(driver.isOn).to.be["false"];
        assert(connection.digitalWrite.calledOnce);
        return assert(connection.digitalWrite.calledWith(13, 0));
      });
    });
    describe("#toggle", function() {
      context("when @isOn is true", function() {
        return it("turns the motor off", function() {
          var turnOff;
          driver.isOn = true;
          turnOff = sinon.stub(driver, 'turnOff');
          driver.toggle();
          return assert(turnOff.calledOnce);
        });
      });
      return context("when @isOn is false", function() {
        return it("turns the motor on", function() {
          var turnOn;
          driver.isOn = false;
          turnOn = sinon.stub(driver, 'turnOn');
          driver.toggle();
          return assert(turnOn.calledOnce);
        });
      });
    });
    describe("#currentSpeed", function() {
      return it("returns the current @speedValue of the motor", function() {
        driver.speedValue = 120;
        return expect(driver.currentSpeed()).to.be.eql(120);
      });
    });
    return describe("#speed", function() {
      before(function() {
        var connection;
        connection = {
          pwmWrite: spy()
        };
        driver.connection = connection;
        return driver.speed(100);
      });
      it("writes the speed value to the pin via the connection", function() {
        assert(driver.connection.pwmWrite.calledOnce);
        return assert(driver.connection.pwmWrite.calledWith(13, 100));
      });
      it("sets @speedValue to the passed value", function() {
        return expect(driver.speedValue).to.be.eql(100);
      });
      return it("sets @isOn depending on whether the speed is greater than 0", function() {
        expect(driver.isOn).to.be["true"];
        driver.speed(0);
        return expect(driver.isOn).to.be["false"];
      });
    });
  });

}).call(this);
