"use strict";

var module = source("cylon-gpio");
var Cylon = require('cylon');

var AnalogSensor = source('analog-sensor');
var Button = source('button');
var ContinuousServo = source('continuous-servo');
var Led = source('led');
var MakeyButton = source('makey-button');
var Maxbotix = source('maxbotix');
var Motor = source('motor');
var Servo = source('servo');
var IrRangeSensor = source('ir-range-sensor');
var DirectPin = source('direct-pin');

describe("GPIO", function() {
  describe('#driver', function() {
    after(function() {
      AnalogSensor.restore()
      Button.restore()
      ContinuousServo.restore()
      Led.restore()
      MakeyButton.restore()
      Maxbotix.restore()
      Motor.restore()
      Servo.restore()
    });

    it("can instantiate a new AnalogSensor", function() {
      var s = sinon.spy(AnalogSensor)
      var opts = { name: 'analogSensor', device: {}}
      module.driver(opts);
      expect(s.calledWithNew);
      expect(s.calledWith(opts));
    });

    it("can instantiate a new Button", function() {
      stub(Button, 'Button');
      var opts = { name: 'button' }

      module.driver(opts);

      expect(Cylon.Drivers.GPIO.Button).to.be.calledWithNew;
      expect(Cylon.Drivers.GPIO.Button).to.be.calledWith(opts);
    });

    it("can instantiate a new ContinuousServo", function() {
      stub(Cylon.Drivers.GPIO, 'ContinuousServo');
      var opts = { name: 'continuous-servo' }

      module.driver(opts);

      expect(Cylon.Drivers.GPIO.ContinuousServo).to.be.calledWithNew;
      expect(Cylon.Drivers.GPIO.ContinuousServo).to.be.calledWith(opts);
    });

    it("can instantiate a new LED", function() {
      var s = sinon.spy(Led)
      var opts = { name: 'led', device: {} }
      module.driver(opts);
      expect(s.calledWithNew);
      expect(s.calledWith(opts));
    });

    it("can instantiate a new MakeyButton", function() {
      stub(Cylon.Drivers.GPIO, 'MakeyButton');
      var opts = { name: 'makey-button' }

      module.driver(opts);

      expect(Cylon.Drivers.GPIO.MakeyButton).to.be.calledWithNew;
      expect(Cylon.Drivers.GPIO.MakeyButton).to.be.calledWith(opts);
    });

    it("can instantiate a new Maxbotix", function() {
      stub(Cylon.Drivers.GPIO, 'Maxbotix');
      var opts = { name: 'maxbotix' }

      module.driver(opts);

      expect(Cylon.Drivers.GPIO.Maxbotix).to.be.calledWithNew;
      expect(Cylon.Drivers.GPIO.Maxbotix).to.be.calledWith(opts);
    });

    it("can instantiate a new Motor", function() {
      stub(Cylon.Drivers.GPIO, 'Motor');
      var opts = { name: 'motor' }

      module.driver(opts);

      expect(Cylon.Drivers.GPIO.Motor).to.be.calledWithNew;
      expect(Cylon.Drivers.GPIO.Motor).to.be.calledWith(opts);
    });

    it("can instantiate a new Servo", function() {
      stub(Cylon.Drivers.GPIO, 'Servo');
      var opts = { name: 'servo' }

      module.driver(opts);

      expect(Cylon.Drivers.GPIO.Servo).to.be.calledWithNew;
      expect(Cylon.Drivers.GPIO.Servo).to.be.calledWith(opts);
    });

    it("returns null if not passed a name", function() {
      expect(module.driver({})).to.be.eql(null);
    });
  });

  describe("#register", function() {
    var robot = { registerDriver: spy() },
        register = robot.registerDriver;

    before(function() { module.register(robot); });

    it("registers the analogSensor driver", function() {
      expect(register).to.be.calledWith('cylon-gpio', 'analogSensor');
    });

    it("registers the button driver", function() {
      expect(register).to.be.calledWith('cylon-gpio', 'button');
    });

    it("registers the ContinuousServo driver", function() {
      expect(register).to.be.calledWith('cylon-gpio', 'continuous-servo');
    });

    it("registers the LED driver", function() {
      expect(register).to.be.calledWith('cylon-gpio', 'led');
    });

    it("registers the MakeyButton driver", function() {
      expect(register).to.be.calledWith('cylon-gpio', 'makey-button');
    });

    it("registers the Maxbotix driver", function() {
      expect(register).to.be.calledWith('cylon-gpio', 'maxbotix');
    });

    it("registers the Motor driver", function() {
      expect(register).to.be.calledWith('cylon-gpio', 'motor');
    });

    it("registers the Servo driver", function() {
      expect(register).to.be.calledWith('cylon-gpio', 'servo');
    });
  });
});
