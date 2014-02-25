(function() {
  'use strict';
  var LED;

  LED = source("led");

  describe("Cylon.Drivers.GPIO.Led", function() {
    var driver, spy;
    driver = new LED({
      name: 'blinky',
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
      return it("sets @isOn to false by default", function() {
        return expect(driver.isOn).to.be["false"];
      });
    });
    it("has led commands", function() {
      return expect(driver.commands()).to.be.eql(['turnOn', 'turnOff', 'toggle', 'brightness']);
    });
    describe('#turnOn', function() {
      return it('writes a high value to the pin', function() {
        var connection;
        connection = {
          digitalWrite: spy()
        };
        driver.isOn = false;
        driver.connection = connection;
        driver.turnOn();
        expect(driver.isOn).to.be["true"];
        assert(connection.digitalWrite.calledOnce);
        return assert(connection.digitalWrite.calledWith(13, 1));
      });
    });
    describe('#turnOff', function() {
      return it('writes a high value to the pin', function() {
        var connection;
        connection = {
          digitalWrite: spy()
        };
        driver.isOn = true;
        driver.connection = connection;
        driver.turnOff();
        expect(driver.isOn).to.be["false"];
        assert(connection.digitalWrite.calledOnce);
        return assert(connection.digitalWrite.calledWith(13, 0));
      });
    });
    return describe('#toggle', function() {
      context('when @isOn is true', function() {
        return it('turns the light off', function() {
          var turnOff;
          driver.isOn = true;
          turnOff = sinon.stub(driver, 'turnOff');
          driver.toggle();
          return assert(turnOff.calledOnce);
        });
      });
      return context('when @isOn is false', function() {
        return it('turns the light on', function() {
          var turnOn;
          driver.isOn = false;
          turnOn = sinon.stub(driver, 'turnOn');
          driver.toggle();
          return assert(turnOn.calledOnce);
        });
      });
    });
  });

}).call(this);
