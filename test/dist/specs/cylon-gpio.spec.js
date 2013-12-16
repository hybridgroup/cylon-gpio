(function() {
  'use strict';
  var gpio;

  gpio = source("cylon-gpio");

  describe("Cylon.Drivers.GPIO", function() {
    it("standard async test", function(done) {
      var bool;
      bool = false;
      bool.should.be["false"];
      setTimeout(function() {
        bool.should.be["false"];
        bool = true;
        return bool.should.be["true"];
      });
      150;
      setTimeout(function() {
        bool.should.be["true"];
        return done();
      });
      return 300;
    });
    it("standard sync test", function() {
      var data, obj;
      data = [];
      obj = {
        id: 5,
        name: 'test'
      };
      data.should.be.empty;
      data.push(obj);
      data.should.have.length(1);
      data[0].should.be.eql(obj);
      return data[0].should.be.equal(obj);
    });
    it("should be able to register", function() {
      return gpio.register.should.be.a('function');
    });
    return it("should be able to create led driver", function() {
      return gpio.driver.should.be.a('function');
    });
  });

}).call(this);
