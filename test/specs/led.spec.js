"use strict";

var Led = source("led");

describe("Led", function() {
  var driver = new Led({
    name: 'blinky',
    device: {
      connection: { digitalWrite: spy(), pwmWrite: spy() },
      pin: 13
    },
    extraParams: {}
  });

  describe('constructor', function() {
    it("sets @pin to the value of the passed device's pin", function() {
      expect(driver.pin).to.be.eql(13);
    });

     it("sets @isHigh to false by default", function() {
      expect(driver.isHigh).to.be.false;
    });
  });

  it("has led commands", function() {
    var commands = ['isOn', 'turnOn', 'turnOff', 'toggle', 'brightness'];
    expect(driver.commands()).to.be.eql(commands);
  });

  describe('#turnOn', function() {
    it('writes a high value to the pin', function() {
      driver.isHigh = false;
      driver.turnOn();

      expect(driver.isHigh).to.be.true;
      expect(driver.connection.digitalWrite).to.be.calledWith(13 ,1);
    });
  });

  describe('#turnOff', function() {
    it('writes a high value to the pin', function() {
      driver.isHigh = true;
      driver.turnOff();

      expect(driver.isHigh).to.be.false;
      expect(driver.connection.digitalWrite).to.be.calledWith(13, 0);
    });
  });

  describe('#toggle', function() {
    context('when @isHigh is true', function() {
      before(function() {
        driver.isHigh = true;
        stub(driver, 'turnOff');
      });

      after(function() {
        driver.turnOff.restore();
      });

      it('turns the light off', function() {
        driver.toggle();
        expect(driver.turnOff).to.be.called;
      });
    });

    context('when @isHigh is false', function() {
      before(function() {
        driver.isHigh = false;
        stub(driver, 'turnOn');
      });

      after(function() {
        driver.turnOn.restore();
      });

      it('turns the light on', function() {
        driver.toggle();
        expect(driver.turnOn).to.be.called;
      });
    });
  });

  describe("#brightness", function() {
    it("calls #pwmWrite to set the pin's brightness", function() {
      driver.brightness(250);
      expect(driver.connection.pwmWrite).to.be.calledWith(13, 250);
    });
  });

  describe("#isOn", function() {
    it("returns the value of @isHigh", function() {
      driver.isHigh = true;
      expect(driver.isOn()).to.be.eql(true);

      driver.isHigh = false;
      expect(driver.isOn()).to.be.eql(false);
    });
  });
});
