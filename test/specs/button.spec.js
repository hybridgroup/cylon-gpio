"use strict";

source("button");

describe("Cylon.Drivers.GPIO.Button", function() {
  var driver = new Cylon.Drivers.GPIO.Button({
    name: 'button',
    device: { connection: 'connect', pin: 13 }
  });

  describe("constructor", function() {
    it("sets @pin to the passed device's pin", function() {
      expect(driver.pin).to.be.eql(13);
    });

    it("sets @isPressed to false by default", function() {
      expect(driver.isPressed).to.be["false"];
    });
  });

  describe("#commands", function() {
    var commands = driver.commands();

    it("returns an array of button commands", function() {
      expect(commands).to.be.an('array');

      for(var i = 0; i < commands.length; i++) {
        expect(commands[i]).to.be.a('string');
      }
    });
  });

  describe("on the 'data' event", function() {
    var callback = function() {},
        originalConnection;

    before(function() {
      originalConnection = driver.connection;

      driver.connection = { digitalRead: stub() };
      driver.device = { emit: spy() };
    });

    context("when 1", function() {
      before(function() {
        driver.connection.digitalRead.callsArgWith(1, 1);
        driver.start(callback);
      });

      it("emits 'push'", function() {
        expect(driver.device.emit).to.be.calledWith('push');
      });

      it('sets @isPressed to true', function() {
        expect(driver.isPressed).to.be.true;
      });
    });

    context("when 0", function() {
      before(function() {
        driver.connection.digitalRead.callsArgWith(1, 0);
        driver.start(callback);
      });

      it("emits 'release'", function() {
        expect(driver.device.emit).to.be.calledWith('release');
      });

      it('sets @isPressed to false', function() {
        expect(driver.isPressed).to.be.false;
      });
    });
  });
});
