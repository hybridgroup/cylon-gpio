"use strict";

var Button = source("button");

describe("Button", function() {
  var driver;

  beforeEach(function() {
    driver = new Button({
      name: 'button',
      connection: {},
      pin: 13
    });
  });

  describe("constructor", function() {
    it("sets @pin to the passed pin", function() {
      expect(driver.pin).to.be.eql(13);
    });

    it("sets @pressed to false by default", function() {
      expect(driver.pressed).to.be["false"];
    });

    context("if no pin is specified", function() {
      it("throws an error", function() {
        var fn = function() { new Button({ name: 'hi' }); };
        expect(fn).to.throw("No pin specified for Button. Cannot proceed");
      });
    });
  });

  describe("#commands", function() {
    it("is an object containing Button commands", function() {
      for (var c in driver.commands) {
        expect(driver.commands[c]).to.be.a('function');
      }
    });
  });

  describe("on the 'data' event", function() {
    var callback = function() {};

    beforeEach(function() {
      driver.connection = { digitalRead: stub() };
      driver.emit = spy();
    });

    context("when 1", function() {
      beforeEach(function() {
        driver.connection.digitalRead.callsArgWith(1, null, 1);
        driver.start(callback);
      });

      it("emits 'press'", function() {
        expect(driver.emit).to.be.calledWith('press');
      });

      it('sets @isPressed to true', function() {
        expect(driver.isPressed()).to.be.true;
      });
    });

    context("when 0", function() {
      beforeEach(function() {
        driver.connection.digitalRead.callsArgWith(1, null, 0);
        driver.start(callback);
      });

      it("emits 'release'", function() {
        expect(driver.emit).to.be.calledWith('release');
      });

      it('sets @isPressed to false', function() {
        expect(driver.isPressed()).to.be.false;
      });
    });

    context("when 1 and prevState == 0", function() {
      beforeEach(function() {
        driver.start(callback);
        driver.connection.digitalRead.yield(null, 1);
        driver.connection.digitalRead.yield(null, 0);
      });

      it("emits 'push'", function() {
        expect(driver.emit).to.be.calledWith('push');
      });
    });
  });
});
