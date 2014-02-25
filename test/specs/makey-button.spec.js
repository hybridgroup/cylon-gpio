"use strict";

var MakeyButton = source("makey-button");

describe("Cylon.Drivers.GPIO.MakeyButton", function() {
  var driver = new MakeyButton({
    name: 'button',
    device: {
      connection: 'connect',
      pin: 13
    }
  });

  describe("#constructor", function() {
    it("sets @pin to the passed device's pin", function() {
      expect(driver.pin).to.be.eql(13);
    });

    it("sets @isPressed to false by default", function() {
      expect(driver.isPressed).to.be["false"];
    });

    it("sets @data to an empty array by default", function() {
      expect(driver.data).to.be.eql([]);
    });
  });

  it("provides an array of makey-button commands", function() {
    expect(driver.commands()).to.be.eql(['isPressed']);
  });

  describe('#averateData', function() {
    context("when @data is empty", function() {
      before(function() { driver.data = []; });

      it("returns 0", function() {
        expect(driver.averageData()).to.be.eql(0);
      });
    });

    context("when @data is an array of values", function() {
      before(function() { driver.data = [0, 0, 10, 10]; });

      it("returns an average", function() {
        expect(driver.averageData()).to.be.eql(5);
      });
    });
  });
});
