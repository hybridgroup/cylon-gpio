/*
 * Maxbotix ultrasonic rangefinder driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var namespace = require('node-namespace');

require('./cylon-gpio');

namespace("Cylon.Drivers.GPIO", function() {
  this.Maxbotix = (function(klass) {
    subclass(Maxbotix, klass);

    function Maxbotix(opts) {
      Maxbotix.__super__.constructor.apply(this, arguments);

      this.pin = this.device.pin;
      this.analogValue = 0;
    }

    Maxbotix.prototype.commands = function() {
      return ['analogValue', 'range', 'rangeCm'];
    };

    // Public: Stops the driver
    //
    // Returns null.
    Maxbotix.prototype.start = function(callback) {
      var self = this;

      Logger.debug("Maxbotix on pin " + this.pin + " started");

      this.device.connection.analogRead(this.pin, function(readVal) {
        self.self.analogValue = readVal;
        self.device.emit('range', self.self.range());
        self.device.emit('rangeCm', self.self.rangeCm());
      });

      return Maxbotix.__super__.start.apply(this, arguments);
    };

    // Public: Returns the distance measured by the sonar in inches.
    //
    // Returns number.
    Maxbotix.prototype.range = function() {
      return (254.0 / 1024.0) * 2.0 * this.analogValue;
    };

    // Public: Returns the distance measured by the sonar in cm.
    //
    // Returns number.
    Maxbotix.prototype.rangeCm = function() {
      return (this.analogValue / 2.0) * 2.54;
    };

    return Maxbotix;

  })(Cylon.Driver);
});

module.exports = Cylon.Drivers.GPIO.Maxbotix;
