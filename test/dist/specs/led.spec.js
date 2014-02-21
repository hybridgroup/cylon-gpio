(function() {
  'use strict';
  var LED;

  LED = source("led");

  describe("Cylon.Drivers.GPIO.Led", function() {
    var led, spy;
    led = new LED({
      name: 'blinky',
      device: {
        connection: 'connect',
        pin: 13
      }
    });
    spy = sinon.spy;
    it("has LED commands", function() {
      return expect(led.commands()).to.be.eql(['turnOn', 'turnOff', 'toggle', 'brightness']);
    });
    describe('#turnOn', function() {
      return it('writes a high value to the pin', function() {
        var connection;
        connection = {
          digitalWrite: spy()
        };
        led.isOn = false;
        led.connection = connection;
        led.turnOn();
        expect(led.isOn).to.be.eql(true);
        assert(connection.digitalWrite.calledOnce);
        return assert(connection.digitalWrite.calledWith(13, 1));
      });
    });
    describe('#turnOff', function() {
      return it('writes a high value to the pin', function() {
        var connection;
        connection = {
          digitalWrite: spy()
        };
        led.isOn = true;
        led.connection = connection;
        led.turnOff();
        expect(led.isOn).to.be.eql(false);
        assert(connection.digitalWrite.calledOnce);
        return assert(connection.digitalWrite.calledWith(13, 0));
      });
    });
    return describe('#toggle', function() {
      context('when @isOn is true', function() {
        return it('turns the light off', function() {
          var turnOff;
          led.isOn = true;
          turnOff = sinon.stub(led, 'turnOff');
          led.toggle();
          return assert(turnOff.calledOnce);
        });
      });
      return context('when @isOn is false', function() {
        return it('turns the light on', function() {
          var turnOn;
          led.isOn = false;
          turnOn = sinon.stub(led, 'turnOn');
          led.toggle();
          return assert(turnOn.calledOnce);
        });
      });
    });
  });

}).call(this);
