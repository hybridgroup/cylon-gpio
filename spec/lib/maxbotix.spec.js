"use strict";

var Maxbotix = lib("maxbotix");

describe("Maxbotix", function() {
  var driver;

  beforeEach(function() {
    driver = new Maxbotix({
      name: "max",
      connection: { analogRead: function() {} },
      pin: 13
    });
  });

  describe("#constructor", function() {
    it("sets @pin to the pin", function() {
      expect(driver.pin).to.be.eql(13);
    });

    it("sets @analogValue to 0 by default", function() {
      expect(driver.analogValue).to.be.eql(0);
    });

    context("if no pin is specified", function() {
      it("throws an error", function() {
        var fn = function() { return new Maxbotix({ name: "hi" }); };
        expect(fn).to.throw("No pin specified for Maxbotix. Cannot proceed");
      });
    });
  });

  describe("#commands", function() {
    it("is an object containing Maxbotix commands", function() {
      for (var c in driver.commands) {
        expect(driver.commands[c]).to.be.a("function");
      }
    });
  });

  describe("#start", function() {
    beforeEach(function() {
      stub(driver.connection, "analogRead").callsArgWith(1, null, 20);
      stub(driver, "range").returns(10);
      stub(driver, "rangeCm").returns(20);
      stub(driver, "emit");

      driver.start(function() {});
    });

    after(function() {
      driver.connection.analogRead.restore();
      driver.range.restore();
      driver.rangeCm.restore();
    });

    it("asks the connection to read the analog pin value", function() {
      expect(driver.connection.analogRead).to.be.calledWith(13);
    });

    it("sets @analogValue to the pin value", function() {
      expect(driver.analogValue).to.be.eql(20);
    });

    it("emits 'range' with the distance in inches", function() {
      expect(driver.emit).to.be.calledWith("range", 10);
    });

    it("emits 'rangeCm' with the distance in centimeters", function() {
      expect(driver.emit).to.be.calledWith("rangeCm", 20);
    });
  });

  describe("#start", function() {
    var callback = spy();

    beforeEach(function() {
      driver.halt(callback);
    });

    it("calls the callback when halting", function() {
      expect(callback).to.be.calledOnce;
    });
  });
  describe("#range", function() {
    context("with no reading", function() {
      beforeEach(function() { driver.analogValue = 0; });

      it("returns 0", function() {
        expect(driver.range()).to.equal(0);
      });
    });

    context("with a reading of 20.1575", function() {
      beforeEach(function() { driver.analogValue = 20.1575; });

      it("returns a value near 10", function() {
        expect(driver.range()).to.be.closeTo(10, 0.1);
      });
    });
  });

  describe("#rangeCm", function() {
    context("with no reading", function() {
      beforeEach(function() { driver.analogValue = 0; });

      it("returns 0", function() {
        expect(driver.rangeCm()).to.equal(0);
      });
    });

    context("with a reading of 20.1575", function() {
      beforeEach(function() { driver.analogValue = 20.1575; });

      it("returns a value near 25.6", function() {
        expect(driver.rangeCm()).to.be.closeTo(25.6, 0.0001);
      });

      it("returns a value 40.315 when model === 'xl-long'", function() {
        driver.model = "xl-long";
        expect(driver.rangeCm()).to.be.closeTo(40.315, 0.001);
      });

      it("returns a value near 10.58 when model === 'hr'", function() {
        driver.model = "hr";
        expect(driver.rangeCm()).to.be.closeTo(10.0788, 0.0001);
      });

      it("returns a value 25.1575 when model === 'xl'", function() {
        driver.model = "xl";
        expect(driver.rangeCm()).to.be.eql(20.1575);
      });

      it("returns a value 25.1575 when model not specified", function() {
        driver.model = "zz";
        expect(driver.rangeCm()).to.be.eql(20.1575);
      });
    });
  });
});
