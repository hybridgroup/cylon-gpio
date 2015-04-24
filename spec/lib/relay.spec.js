/* jshint expr:true */
"use strict";

var Relay = source("relay");

describe("Relay", function() {
  var driver;

  beforeEach(function() {
    driver = new Relay({
      name: "switchy",
      connection: { digitalWrite: spy(), pwmWrite: spy() },
      pin: 13
    });
  });

  describe("constructor", function() {
    it("sets @pin to the value of the passed pin", function() {
      expect(driver.pin).to.be.eql(13);
    });

    it("sets @isOn to false by default", function() {
      expect(driver.state.isOn).to.be.false;
    });

    context("if no pin is specified", function() {
      it("throws an error", function() {
        var fn = function() { return new Relay({ name: "hi" }); };
        expect(fn).to.throw("No pin specified for Relay. Cannot proceed");
      });
    });
  });

  it("has Relay commands", function() {
    for (var c in driver.commands) {
      expect(driver.commands[c]).to.be.a("function");
    }
  });

  describe("#start", function() {
    var callback =spy();

    beforeEach(function() {
      driver.start(callback);
    });

    it("triggers the callback", function() {
      expect(callback).to.be.calledOnce;
    });
  });

  describe("#halt", function() {
    var callback =spy();

    beforeEach(function() {
      driver.halt(callback);
    });

    it("triggers the callback", function() {
      expect(callback).to.be.calledOnce;
    });
  });

  describe("#turnOn", function() {
    it("writes a high value to the pin", function() {
      driver.state.isOn = false;
      driver.turnOn();

      expect(driver.state.isOn).to.be.true;
      expect(driver.connection.digitalWrite).to.be.calledWith(13 ,1);
    });
  });

  describe("#turnOff", function() {
    it("writes a high value to the pin", function() {
      driver.state.isOn = true;
      driver.turnOff();

      expect(driver.state.isOn).to.be.false;
      expect(driver.connection.digitalWrite).to.be.calledWith(13, 0);
    });
  });

  describe("#toggle", function() {
    context("when @isOn is true", function() {
      beforeEach(function() {
        driver.state.isOn = true;
        stub(driver, "turnOff");
      });

      after(function() {
        driver.turnOff.restore();
      });

      it("turns the Relay off", function() {
        driver.toggle();
        expect(driver.turnOff).to.be.called;
      });
    });

    context("when @isOn is false", function() {
      beforeEach(function() {
        driver.state.isOn = false;
        stub(driver, "turnOn");
      });

      after(function() {
        driver.turnOn.restore();
      });

      it("turns the Relay on", function() {
        driver.toggle();
        expect(driver.turnOn).to.be.called;
      });
    });
  });

  describe("#isInverted", function() {
    context("when @isInverted is true", function() {
      beforeEach(function() {
        driver.state.isInverted = true;
        driver.state.isOn = true;
        stub(driver, "turnOff");
      });

      after(function() {
        driver.turnOff.restore();
      });

      it("sets @isInverted to true", function() {
        expect(driver.state.isInverted).to.be.true;
      });

      it("turns the Relay off", function() {
        driver.toggle();
        expect(driver.turnOff).to.be.called;
      });
    });
  });
});
