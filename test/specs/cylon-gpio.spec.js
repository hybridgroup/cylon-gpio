"use strict";

var module = source("cylon-gpio");

source('./analog-sensor');
source('./button');
source('./continuous-servo');
source('./led');
source('./makey-button');
source('./maxbotix');
source('./motor');
source('./servo');

describe("Cylon.Drivers.GPIO", function() {
  describe('#driver', function() {
    after(function() {
      Cylon.Drivers.GPIO.AnalogSensor.restore()
      Cylon.Drivers.GPIO.Button.restore()
      Cylon.Drivers.GPIO.ContinuousServo.restore()
      Cylon.Drivers.GPIO.Led.restore()
      Cylon.Drivers.GPIO.MakeyButton.restore()
      Cylon.Drivers.GPIO.Maxbotix.restore()
      Cylon.Drivers.GPIO.Motor.restore()
      Cylon.Drivers.GPIO.Servo.restore()
    });

    it("can instantiate a new AnalogSensor", function() {
      stub(Cylon.Drivers.GPIO, 'AnalogSensor');
      var opts = { name: 'analogSensor' }

      module.driver(opts);

      expect(Cylon.Drivers.GPIO.AnalogSensor).to.be.calledWithNew;
      expect(Cylon.Drivers.GPIO.AnalogSensor).to.be.calledWith(opts);
    });

    it("can instantiate a new Button", function() {
      stub(Cylon.Drivers.GPIO, 'Button');
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
      stub(Cylon.Drivers.GPIO, 'Led');
      var opts = { name: 'led' }

      module.driver(opts);

      expect(Cylon.Drivers.GPIO.Led).to.be.calledWithNew;
      expect(Cylon.Drivers.GPIO.Led).to.be.calledWith(opts);
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
