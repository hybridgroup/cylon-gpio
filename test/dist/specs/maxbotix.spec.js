(function() {
  'use strict';
  var maxbotix;

  maxbotix = source("maxbotix");

  describe("Cylon.Drivers.GPIO.Maxbotix", function() {
    var driver;
    driver = new Cylon.Drivers.GPIO.Maxbotix({
      name: 'max',
      device: {
        connection: 'connect',
        pin: 13
      }
    });
    it("has range of 0 with no reading", function() {
      return driver.range().should.equal(0);
    });
    it("has range in cm of 0 with no reading", function() {
      return driver.rangeCm().should.equal(0);
    });
    it("has range of close to 10 inches with 20.1575 reading", function() {
      driver.analogValue = 20.1575;
      return driver.range().should.be.closeTo(10, 0.0001);
    });
    return it("has range of close to 25.6 cm with 20.1575 reading", function() {
      driver.analogValue = 20.1575;
      return driver.rangeCm().should.be.closeTo(25.6, 0.0001);
    });
  });

}).call(this);
