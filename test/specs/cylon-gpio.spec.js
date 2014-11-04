"use strict";

var module = source("cylon-gpio");

var AnalogSensor = source('analog-sensor'),
    Button = source('button'),
    ContinuousServo = source('continuous-servo'),
    Led = source('led'),
    MakeyButton = source('makey-button'),
    Maxbotix = source('maxbotix'),
    Motor = source('motor'),
    Servo = source('servo'),
    IrRangeSensor = source('ir-range-sensor'),
    DirectPin = source('direct-pin');

describe("GPIO", function() {
  describe("#drivers", function() {

    it("contains all drivers the module provides", function() {
      var drivers = [ 'analogSensor', 'button', 'continuous-servo', 'led', 'makey-button', 'maxbotix', 'motor', 'servo', 'ir-range-sensor', 'direct-pin'];
      expect(module.drivers).to.be.eql(drivers);
    });
  });

  describe('#driver', function() {
    var opts = { device: { connection: {} } };

    it("can instantiate a new AnalogSensor", function() {
      opts.driver = 'analogSensor';
      var driver = module.driver(opts);
      expect(driver).to.be.an.instanceOf(AnalogSensor);
    });

    it("can instantiate a new Button", function() {
      opts.driver = 'button';
      var driver = module.driver(opts);
      expect(driver).to.be.an.instanceOf(Button);
    });

    it("can instantiate a new ContinuousServo", function() {
      opts.driver = 'continuous-servo';
      var driver = module.driver(opts);
      expect(driver).to.be.an.instanceOf(ContinuousServo);
    });

    it("can instantiate a new LED", function() {
      opts.driver = 'led';
      var driver = module.driver(opts);
      expect(driver).to.be.an.instanceOf(Led);
    });

    it("can instantiate a new MakeyButton", function() {
      opts.driver = 'makey-button';
      var driver = module.driver(opts);
      expect(driver).to.be.an.instanceOf(MakeyButton);
    });

    it("can instantiate a new Maxbotix", function() {
      opts.driver = 'maxbotix';
      var driver = module.driver(opts);
      expect(driver).to.be.an.instanceOf(Maxbotix);
    });

    it("can instantiate a new Motor", function() {
      opts.driver = 'motor';
      var driver = module.driver(opts);
      expect(driver).to.be.an.instanceOf(Motor);
    });

    it("can instantiate a new Servo", function() {
      opts.driver = 'servo';
      var driver = module.driver(opts);
      expect(driver).to.be.an.instanceOf(Servo);
    });

    it("can instantiate a new IrRangeSensor", function() {
      opts.driver = 'ir-range-sensor';
      var driver = module.driver(opts);
      expect(driver).to.be.an.instanceOf(IrRangeSensor);
    });

    it("can instantiate a new DirectPin", function() {
      opts.driver = 'direct-pin';
      var driver = module.driver(opts);
      expect(driver).to.be.an.instanceOf(DirectPin);
    });

    it("returns null if not passed a name", function() {
      expect(module.driver({})).to.be.eql(null);
    });
  });
});
