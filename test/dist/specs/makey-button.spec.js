(function() {
  'use strict';
  var MakeyButton;

  MakeyButton = source("makey-button");

  describe("Cylon.Drivers.GPIO.MakeyButton", function() {
    var driver;
    driver = new MakeyButton({
      name: 'button',
      device: {
        connection: 'connect',
        pin: 13
      }
    });
    describe("#constructor", function() {
      it("sets @pin to the passed device's pin", function() {
        return expect(driver.pin).to.be.eql(13);
      });
      it("sets @isPressed to false by default", function() {
        return expect(driver.isPressed).to.be["false"];
      });
      return it("sets @data to an empty array by default", function() {
        return expect(driver.data).to.be.eql([]);
      });
    });
    it("provides an array of makey-button commands", function() {
      return expect(driver.commands()).to.be.eql(['isPressed']);
    });
    return describe('#averateData', function() {
      context("when @data is empty", function() {
        before(function() {
          return driver.data = [];
        });
        return it("returns 0", function() {
          return expect(driver.averageData()).to.be.eql(0);
        });
      });
      return context("when @data is an array of values", function() {
        before(function() {
          return driver.data = [0, 0, 10, 10];
        });
        return it("returns an average", function() {
          return expect(driver.averageData()).to.be.eql(5);
        });
      });
    });
  });

}).call(this);
