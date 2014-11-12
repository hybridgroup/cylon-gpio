"use strict";

var Led = source("led");

describe("Led", function() {
  var driver;

  beforeEach(function() {
    driver = new Led({
      name: 'blinky',
      adaptor: { digitalWrite: spy(), pwmWrite: spy() },
      pin: 13
    });
  });

  describe('constructor', function() {
    it("sets @pin to the value of the passed pin", function() {
      expect(driver.pin).to.be.eql(13);
    });

     it("sets @isHigh to false by default", function() {
      expect(driver.isHigh).to.be.false;
    });
  });

  it("has led commands", function() {
    for (var c in driver.commands) {
      expect(driver.commands[c]).to.be.a('function');
    }
  });

  describe('#turnOn', function() {
    it('writes a high value to the pin', function() {
      driver.isHigh = false;
      driver.turnOn();

      expect(driver.isHigh).to.be.true;
      expect(driver.adaptor.digitalWrite).to.be.calledWith(13 ,1);
    });
  });

  describe('#turnOff', function() {
    it('writes a high value to the pin', function() {
      driver.isHigh = true;
      driver.turnOff();

      expect(driver.isHigh).to.be.false;
      expect(driver.adaptor.digitalWrite).to.be.calledWith(13, 0);
    });
  });

  describe('#toggle', function() {
    context('when @isHigh is true', function() {
      beforeEach(function() {
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
      beforeEach(function() {
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
      driver.brightness(255);
      expect(driver.adaptor.pwmWrite).to.be.calledWith(13, 1);
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
