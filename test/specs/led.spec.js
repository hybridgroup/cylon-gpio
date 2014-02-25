"use strict";

var LED = source("led");

describe("Cylon.Drivers.GPIO.Led", function() {
  var driver = new LED({
    name: 'blinky',
    device: {
      connection: 'connect',
      pin: 13
    }
  });

  describe('constructor', function() {
    it("sets @pin to the value of the passed device's pin", function() {
      expect(driver.pin).to.be.eql(13);
    });

     it("sets @isOn to false by default", function() {
      expect(driver.isOn).to.be["false"];
    });
  });

  it("has led commands", function() {
    var commands = ['turnOn', 'turnOff', 'toggle', 'brightness'];
    expect(driver.commands()).to.be.eql(commands);
  });

  describe('#turnOn', function() {
    it('writes a high value to the pin', function() {
      var connection = { digitalWrite: spy() };

      driver.isOn = false;
      driver.connection = connection;
      driver.turnOn();

      expect(driver.isOn).to.be["true"];

      assert(connection.digitalWrite.calledOnce);
      assert(connection.digitalWrite.calledWith(13, 1));
    });
  });

  describe('#turnOff', function() {
    it('writes a high value to the pin', function() {
      var connection = { digitalWrite: spy() };
      driver.isOn = true;
      driver.connection = connection;

      driver.turnOff();

      expect(driver.isOn).to.be["false"];

      assert(connection.digitalWrite.calledOnce);
      assert(connection.digitalWrite.calledWith(13, 0));
    });
  });

  describe('#toggle', function() {
    context('when @isOn is true', function() {
      it('turns the light off', function() {
        var turnOff = sinon.stub(driver, 'turnOff');
        driver.isOn = true;

        driver.toggle();

        assert(turnOff.calledOnce);
      });
    });

    context('when @isOn is false', function() {
      it('turns the light on', function() {
        var turnOn = sinon.stub(driver, 'turnOn');
        driver.isOn = false;

        driver.toggle();

        assert(turnOn.calledOnce);
      });
    });
  });
});
