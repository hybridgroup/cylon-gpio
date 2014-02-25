'use strict';
var Maxbotix = source("maxbotix");

describe("Cylon.Drivers.GPIO.Maxbotix", function() {
  var driver = new Maxbotix({
    name: 'max',
    device: {
      connection: 'connect',
      pin: 13
    }
  });

  describe("#constructor", function() {
    it("sets @pin to the device's pin", function() {
      expect(driver.pin).to.be.eql(13);
    });

    it("sets @analogValue to 0 by default", function() {
      expect(driver.analogValue).to.be.eql(0);
    });
  });

  it("has an array of maxbotix commands", function() {
    expect(driver.commands()).to.be.eql(["analogValue", "range", "rangeCm"]);
  });

  describe("#range", function() {
    context("with no reading", function() {
      before(function() { driver.analogValue = 0; });

      it("returns 0", function() {
        expect(driver.range()).to.equal(0);
      });
    });

    context("with a reading of 20.1575", function() {
      before(function() { driver.analogValue = 20.1575; });

      it("returns a value near 10", function() {
        expect(driver.range()).to.be.closeTo(10, 0.0001);
      });
    });
  });

  describe("#rangeCm", function() {
    context("with no reading", function() {
      before(function() { driver.analogValue = 0; });

      it("returns 0", function() {
        expect(driver.rangeCm()).to.equal(0);
      });
    });

    context("with a reading of 20.1575", function() {
      before(function() { driver.analogValue = 20.1575; });

      it("returns a value near 25.6", function() {
        expect(driver.rangeCm()).to.be.closeTo(25.6, 0.0001);
      });
    });
  });
});
