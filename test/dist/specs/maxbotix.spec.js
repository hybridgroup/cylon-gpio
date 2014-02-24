(function() {
  'use strict';
  var Maxbotix;

  Maxbotix = source("maxbotix");

  describe("Cylon.Drivers.GPIO.Maxbotix", function() {
    var driver;
    driver = new Maxbotix({
      name: 'max',
      device: {
        connection: 'connect',
        pin: 13
      }
    });
    describe("#constructor", function() {
      it("sets @pin to the device's pin", function() {
        return expect(driver.pin).to.be.eql(13);
      });
      return it("sets @analogValue to 0 by default", function() {
        return expect(driver.analogValue).to.be.eql(0);
      });
    });
    it("has an array of maxbotix commands", function() {
      return expect(driver.commands()).to.be.eql(["analogValue", "range", "rangeCm"]);
    });
    describe("#range", function() {
      context("with no reading", function() {
        before(function() {
          return driver.analogValue = 0;
        });
        return it("returns 0", function() {
          return expect(driver.range()).to.equal(0);
        });
      });
      return context("with a reading of 20.1575", function() {
        before(function() {
          return driver.analogValue = 20.1575;
        });
        return it("returns a value near 10", function() {
          return expect(driver.range()).to.be.closeTo(10, 0.0001);
        });
      });
    });
    return describe("#rangeCm", function() {
      context("with no reading", function() {
        before(function() {
          return driver.analogValue = 0;
        });
        return it("returns 0", function() {
          return expect(driver.rangeCm()).to.equal(0);
        });
      });
      return context("with a reading of 20.1575", function() {
        before(function() {
          return driver.analogValue = 20.1575;
        });
        return it("returns a value near 25.6", function() {
          return expect(driver.rangeCm()).to.be.closeTo(25.6, 0.0001);
        });
      });
    });
  });

}).call(this);
