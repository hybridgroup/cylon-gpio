"use strict";

var RGBLed = lib("rgb-led");

describe("RGBLed", function() {
  var driver;

  beforeEach(function() {
    driver = new RGBLed({
      name: "blinky",
      connection: { digitalWrite: spy(), pwmWrite: spy() },
      redPin: 3,
      greenPin: 5,
      bluePin: 6
    });
  });

  describe("constructor", function() {
    it("sets pins to the values of the passed pins", function() {
      expect(driver.redPin).to.be.eql(3);
      expect(driver.greenPin).to.be.eql(5);
      expect(driver.bluePin).to.be.eql(6);
    });

    context("if no red pin is specified", function() {
      it("throws an error", function() {
        var fn = function() { return new RGBLed({ name: "hi" }); };
        var msg = "No red pin specified for RGB LED. Cannot proceed";
        expect(fn).to.throw(msg);
      });
    });
  });

  it("has led commands", function() {
    for (var c in driver.commands) {
      expect(driver.commands[c]).to.be.a("function");
    }
  });

  describe("#start", function() {
    var callback = spy();

    beforeEach(function() {
      driver.start(callback);
    });

    it("triggers the callback", function() {
      expect(callback).to.be.calledOnce;
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

  // describe("#setRGB", function() {
  //   beforeEach(function() {
  //     driver.isHigh = true;
  //     stub(driver, "turnOff");
  //   });

  //   after(function() {
  //     driver.turnOff.restore();
  //   });

  //   it("turns the light off", function() {
  //     driver.toggle();
  //     expect(driver.turnOff).to.be.called;
  //   });

  // });

  describe("#isOn", function() {
    it("returns the value of @isHigh", function() {
      driver.isHigh = true;
      expect(driver.isOn()).to.be.eql(true);

      driver.isHigh = false;
      expect(driver.isOn()).to.be.eql(false);
    });
  });
});
