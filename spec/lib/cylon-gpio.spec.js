"use strict";

var mod = lib("../");

var AnalogSensor = lib("analog-sensor"),
    Button = lib("button"),
    ContinuousServo = lib("continuous-servo"),
    Led = lib("led"),
    MakeyButton = lib("makey-button"),
    Maxbotix = lib("maxbotix"),
    Motor = lib("motor"),
    Servo = lib("servo"),
    IrRangeSensor = lib("ir-range-sensor"),
    DirectPin = lib("direct-pin"),
    RGBLed = lib("rgb-led");

describe("GPIO", function() {
  describe("#drivers", function() {

    it("contains all drivers the mod provides", function() {
      var drivers = [
        "analog-sensor",
        "analogSensor",
        "button",
        "continuous-servo",
        "led",
        "makey-button",
        "maxbotix",
        "motor",
        "relay",
        "servo",
        "ir-range-sensor",
        "direct-pin",
        "rgb-led",
        "temperature-sensor",
        "tp401"
      ];

      expect(mod.drivers).to.be.eql(drivers);
    });
  });

  describe("#driver", function() {
    var opts, driver;

    beforeEach(function() {
      opts = {
        connection: {},
        pin: 1
      };
    });

    it("can instantiate a new AnalogSensor", function() {
      opts.driver = "analogSensor";
      driver = mod.driver(opts);
      expect(driver).to.be.an.instanceOf(AnalogSensor);
    });

    it("can instantiate a new Button", function() {
      opts.driver = "button";
      driver = mod.driver(opts);
      expect(driver).to.be.an.instanceOf(Button);
    });

    it("can instantiate a new ContinuousServo", function() {
      opts.driver = "continuous-servo";
      driver = mod.driver(opts);
      expect(driver).to.be.an.instanceOf(ContinuousServo);
    });

    it("can instantiate a new LED", function() {
      opts.driver = "led";
      driver = mod.driver(opts);
      expect(driver).to.be.an.instanceOf(Led);
    });

    it("can instantiate a new MakeyButton", function() {
      opts.driver = "makey-button";
      driver = mod.driver(opts);
      expect(driver).to.be.an.instanceOf(MakeyButton);
    });

    it("can instantiate a new Maxbotix", function() {
      opts.driver = "maxbotix";
      driver = mod.driver(opts);
      expect(driver).to.be.an.instanceOf(Maxbotix);
    });

    it("can instantiate a new Motor", function() {
      opts.driver = "motor";
      driver = mod.driver(opts);
      expect(driver).to.be.an.instanceOf(Motor);
    });

    it("can instantiate a new Servo", function() {
      opts.driver = "servo";
      driver = mod.driver(opts);
      expect(driver).to.be.an.instanceOf(Servo);
    });

    it("can instantiate a new IrRangeSensor", function() {
      opts.driver = "ir-range-sensor";
      opts.model = "gp2y0a41sk0f";
      driver = mod.driver(opts);
      expect(driver).to.be.an.instanceOf(IrRangeSensor);
    });

    it("can instantiate a new DirectPin", function() {
      opts.driver = "direct-pin";
      driver = mod.driver(opts);
      expect(driver).to.be.an.instanceOf(DirectPin);
    });

    it("can instantiate a new RGB LED", function() {
      opts.driver = "rgb-led";
      opts.redPin = 1;
      opts.greenPin = 2;
      opts.bluePin = 3;
      driver = mod.driver(opts);
      expect(driver).to.be.an.instanceOf(RGBLed);
    });

    it("returns null if not passed a name", function() {
      expect(mod.driver({})).to.be.eql(null);
    });
  });
});
