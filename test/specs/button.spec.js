"use strict";

var Button = source("button");

describe("Cylon.Drivers.GPIO.Button", function() {
  var driver = new Button({
    name: 'button',
    device: {
      connection: 'connect',
      pin: 13
    }
  });

  describe("constructor", function() {
    it("sets @pin to the passed device's pin", function() {
      expect(driver.pin).to.be.eql(13);
    });

    it("sets @isPressed to false by default", function() {
      expect(driver.isPressed).to.be["false"];
    });
  });

  it("provides an array of button commands", function() {
    expect(driver.commands()).to.be.eql(['isPressed']);
  });

  describe("on the 'data' event", function() {
    driver.device = { emit: sinon.spy() };

    context("when 1", function() {
      before(function() {
        driver.connection = {
          digitalRead: function(_, callback) { callback(1); }
        };
        driver.start(function() {});
      });

      it("emits 'push'", function() {
        assert(driver.device.emit.calledWith('push'));
      });

      it('sets @isPressed to true', function() {
        expect(driver.isPressed).to.be["true"];
      });
    });

    context("when 0", function() {
      before(function() {
        driver.connection = {
          digitalRead: function(_, callback) { callback(0); }
        };
        driver.start(function() {});
      });

      it("emits 'release'", function() {
        assert(driver.device.emit.calledWith('release'));
      });

      it('sets @isPressed to false', function() {
        expect(driver.isPressed).to.be["false"];
      });
    });
  });
});
