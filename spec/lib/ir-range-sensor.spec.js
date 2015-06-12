"use strict";

var RangeSensor = lib("ir-range-sensor");

var Cylon = require("cylon");

describe("IrRangeSensor", function() {
  var driver;

  beforeEach(function() {
    driver = new RangeSensor({
      name: "rangeSensor",
      connection: {},
      pin: 5,
      model: "gp2y0a41sk0f"
    });
  });

  describe("constructor", function() {
    it("sets @model to opts.model by default", function() {
      expect(driver.model).to.be.eql("gp2y0a41sk0f");
    });

    it("sets @analogVal to false by default", function() {
      expect(driver.analogVal).to.be.eql(0);
    });

    it("sets @distanceCm to false by default", function() {
      expect(driver.distanceCm).to.be.eql(0);
    });

    it("sets @distanceIn to false by default", function() {
      expect(driver.distanceCm).to.be.eql(0);
    });

    context("if no pin is specified", function() {
      it("throws an error", function() {
        var fn = function() { return new RangeSensor({ name: "hi" }); };
        expect(fn)
          .to
          .throw("No pin specified for IR Range Sensor. Cannot proceed");
      });
    });

    it("sets commands object with the following", function() {
      var commands = [
        "analog_read",
        "range_cm",
        "range"
      ];

      for (var c in commands) {
        expect(driver.commands[commands[c]]).to.be.a("function");
      }
    });
  });

  describe("#_setRangeTable", function() {
    beforeEach(function() {
      stub(Cylon.Logger, "info");
    });

    afterEach(function() {
      Cylon.Logger.info.restore();
    });

    it("sets @rangeTable when @model is not undefined", function() {
      driver._setRangeTable();
      expect(driver.rangeTable).not.to.be.eql({});
      expect(Cylon.Logger.info).to.not.be.called;
    });

    it("sets when @model is not undefined", function() {
      driver.model = undefined;
      driver._setRangeTable();
      expect(driver.rangeTable).to.be.eql({});
      expect(Cylon.Logger.info).to.be.calledOnce;
    });
  });

  describe("#start", function() {
    var callback;

    beforeEach(function() {
      callback = spy();

      driver.connection.analogRead = stub();
      driver.connection.analogRead.yields(null, 180);

      stub(driver, "emit");

      driver.start(callback);
    });

    afterEach(function() {
      driver.emit.restore();
    });

    it("calls connection#analogRead", function() {
      expect(driver.connection.analogRead).to.be.calledOnce;
    });

    it("emits 'range' event", function() {
      expect(driver.emit).to.be.calledWith("range", 5.511811023622047);
    });

    it("emits 'rangeCm' event", function() {
      expect(driver.emit).to.be.calledWith("rangeCm", 14);
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

  describe("#_calcDistances", function() {
    beforeEach(function() {
      driver._calcDistances(180);
    });

    it("sets @analogVal to 180", function() {
      expect(driver.analogVal).to.be.eql(180);
    });

    it("sets @distanceCm to 14", function() {
      expect(driver.distanceCm).to.be.eql(14);
    });

    it("sets @distanceIn to 5", function() {
      expect(driver.distanceIn).to.be.eql(5.511811023622047);
    });
  });

  context("return methods", function() {
    beforeEach(function() {
      driver._calcDistances(180);
    });

    describe("#analogRead", function() {
      it("#analogRead returns the raw analog value of 180", function() {
        expect(driver.analogRead()).to.be.eql(180);
      });
    });

    describe("#rangeCm", function() {
      it("returns the distance in cm === 14", function() {
        expect(driver.rangeCm()).to.be.eql(14);
      });
    });

    describe("#rangeIn", function() {
      it("returns the distance in inches === 5", function() {
        expect(driver.range()).to.be.eql(5.511811023622047);
      });
    });
  });
});
