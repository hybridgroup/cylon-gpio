"use strict";

var Button = lib("button");

describe("Button", function() {
  var driver;

  beforeEach(function() {
    driver = new Button({
      name: "button",
      connection: {},
      pin: 13
    });
  });

  describe("constructor", function() {
    it("sets @pin to the passed pin", function() {
      expect(driver.pin).to.be.eql(13);
    });

    it("sets @pressed to false by default", function() {
      expect(driver.pressed).to.be.false;
    });

    context("if no pin is specified", function() {
      it("throws an error", function() {
        var fn = function() { return new Button({ name: "hi" }); };
        expect(fn).to.throw("No pin specified for Button. Cannot proceed");
      });
    });
  });

  describe("#commands", function() {
    it("is an object containing Button commands", function() {
      for (var c in driver.commands) {
        expect(driver.commands[c]).to.be.a("function");
      }
    });
  });

  describe("on the 'data' event", function() {
    var callback = function() {};

    beforeEach(function() {
      driver.connection = { digitalRead: stub() };
      driver.emit = spy();
    });

    context("when the button is pressed", function() {
      beforeEach(function() {
        driver.start(callback);
        driver.pressed = false;
        driver.connection.digitalRead.yield(null, 1);
        driver.connection.digitalRead.yield(null, 1);
      });

      it("emits 'push' when first pressed", function() {
        expect(driver.emit).to.be.calledWith("push");
        expect(driver.emit).to.be.calledOnce;
      });

      it("sets @pressed to true", function() {
        expect(driver.pressed).to.be.eql(true);
      });
    });

    context("when the button is released", function() {
      beforeEach(function() {
        driver.start(callback);
        driver.pressed = true;
        driver.connection.digitalRead.yield(null, 0);
        driver.connection.digitalRead.yield(null, 0);
      });

      it("emits 'push' when first released", function() {
        expect(driver.emit).to.be.calledWith("release");
        expect(driver.emit).to.be.calledOnce;
      });

      it("sets @pressed to false", function() {
        expect(driver.pressed).to.be.eql(false);
      });
    });
  });

  describe("#halt", function() {
    var callback = spy();

    beforeEach(function() {
      driver.halt(callback);
    });

    it("triggers the callback", function() {
      expect(callback).to.be.calledOnce;
    });
  });

  describe("#isPressed", function() {
    it("returns the value of @pressed", function() {
      driver.pressed = true;
      expect(driver.isPressed()).to.be.eql(true);
    });
  });
});
