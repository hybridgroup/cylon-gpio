'use strict';

var Maxbotix = source("maxbotix");

describe("Maxbotix", function() {
  var driver;

  beforeEach(function() {
    driver = new Maxbotix({
      name: 'max',
      adaptor: { analogRead: function() {} },
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
  });

  describe("#commands", function() {
    it("is an object containing Maxbotix commands", function() {
      for (var c in driver.commands) {
        expect(driver.commands[c]).to.be.a('function');
      }
    });
  });

  describe("#start", function() {
    beforeEach(function() {
      stub(driver.adaptor, 'analogRead').callsArgWith(1, null, 20);
      stub(driver, 'range').returns(10);
      stub(driver, 'rangeCm').returns(20);
      stub(driver, 'emit');

      driver.start(function() {});
    });

    after(function() {
      driver.adaptor.analogRead.restore();
      driver.range.restore();
      driver.rangeCm.restore();
    });

    it("asks the adaptor to read the analog pin value", function() {
      expect(driver.adaptor.analogRead).to.be.calledWith(13);
    });

    it("sets @analogValue to the pin value", function() {
      expect(driver.analogValue).to.be.eql(20);
    });

    it("emits 'range' with the distance in inches", function() {
      expect(driver.emit).to.be.calledWith('range', 10);
    });

    it("emits 'rangeCm' with the distance in centimeters", function() {
      expect(driver.emit).to.be.calledWith('rangeCm', 20);
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
        expect(driver.range()).to.be.closeTo(10, 0.0001);
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
    });
  });
});