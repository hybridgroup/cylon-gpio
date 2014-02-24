(function() {
  'use strict';
  var MOTOR;

  MOTOR = source("motor");

  describe("Cylon.Drivers.GPIO.Motor", function() {
    var motor, spy;
    motor = new MOTOR({
      name: 'vrroom',
      device: {
        connection: 'connect',
        pin: 13
      }
    });
    spy = sinon.spy;
    describe('constructor', function() {
      it("sets @pin to the value of the passed device's pin", function() {
        return expect(motor.pin).to.be.eql(13);
      });
      it("sets @speedvalue to 0 by default", function() {
        return expect(motor.speedValue).to.be.eql(0);
      });
      return it("sets @isOn to false by default", function() {
        return expect(motor.isOn).to.be["false"];
      });
    });
    it('provides a list of motor commands', function() {
      var commands;
      commands = ['turnOn', 'turnOff', 'toggle', 'speed', 'currentSpeed'];
      return expect(motor.commands()).to.be.eql(commands);
    });
    describe("#turnOn", function() {
      return it("writes a high value to the digital pin", function() {
        var connection;
        connection = {
          digitalWrite: spy()
        };
        motor.connection = connection;
        motor.turnOn();
        expect(motor.isOn).to.be["true"];
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
        motor.connection = connection;
        motor.turnOff();
        expect(motor.isOn).to.be["false"];
        assert(connection.digitalWrite.calledOnce);
        return assert(connection.digitalWrite.calledWith(13, 0));
      });
    });
    describe("#toggle", function() {
      context("when @isOn is true", function() {
        return it("turns the motor off", function() {
          var turnOff;
          motor.isOn = true;
          turnOff = sinon.stub(motor, 'turnOff');
          motor.toggle();
          return assert(turnOff.calledOnce);
        });
      });
      return context("when @isOn is false", function() {
        return it("turns the motor on", function() {
          var turnOn;
          motor.isOn = false;
          turnOn = sinon.stub(motor, 'turnOn');
          motor.toggle();
          return assert(turnOn.calledOnce);
        });
      });
    });
    describe("#currentSpeed", function() {
      return it("returns the current @speedValue of the motor", function() {
        motor.speedValue = 120;
        return expect(motor.currentSpeed()).to.be.eql(120);
      });
    });
    return describe("#speed", function() {
      before(function() {
        var connection;
        connection = {
          pwmWrite: spy()
        };
        motor.connection = connection;
        return motor.speed(100);
      });
      it("writes the speed value to the pin via the connection", function() {
        assert(motor.connection.pwmWrite.calledOnce);
        return assert(motor.connection.pwmWrite.calledWith(13, 100));
      });
      it("sets @speedValue to the passed value", function() {
        return expect(motor.speedValue).to.be.eql(100);
      });
      return it("sets @isOn depending on whether the speed is greater than 0", function() {
        expect(motor.isOn).to.be["true"];
        motor.speed(0);
        return expect(motor.isOn).to.be["false"];
      });
    });
  });

}).call(this);
