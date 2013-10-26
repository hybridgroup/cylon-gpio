(function() {
  'use strict';
  var Driver, Led;

  module.exports = Driver.Led = (function() {
    function Led() {}

    return Led;

  })();

  Driver = {
    Led: Led = (function() {
      function Led(opts) {
        this.self = this;
        this.device = opts.device;
        this.connection = this.device.connection;
        this.pin = this.device.pin;
        this.isOn = false;
      }

      Led.prototype.commands = function() {
        return ['turnOn', 'turnOff', 'toggle'];
      };

      Led.prototype.start = function(callback) {
        Logger.debug("LED on pin " + this.pin + " started");
        return callback(null);
      };

      Led.prototype.turnOn = function() {
        this.isOn = true;
        return this.connection.digitalWrite(this.pin, 1);
      };

      Led.prototype.turnOff = function() {
        this.isOn = false;
        return this.connection.digitalWrite(this.pin, 0);
      };

      Led.prototype.toggle = function() {
        if (this.isOn) {
          return this.turnOff();
        } else {
          return this.turnOn();
        }
      };

      return Led;

    })()
  };

}).call(this);
