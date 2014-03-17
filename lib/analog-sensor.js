/*
 * Analog Sensor driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var namespace = require('node-namespace');

require('./cylon-gpio');

namespace("Cylon.Drivers.GPIO", function() {
  this.AnalogSensor = (function(klass) {
    subclass(AnalogSensor, klass);

    function AnalogSensor(opts) {
      AnalogSensor.__super__.constructor.apply(this, arguments);

      var extraParams = opts.extraParams || {};

      this.pin = this.device.pin;
      this.upperLimit = extraParams.upperLimit || 256;
      this.lowerLimit = extraParams.lowerLimit || 0;
      this.analog_val = null;
    }

    AnalogSensor.prototype.commands = function() {
      return ['analogRead'];
    };

    // Public: Starts the driver
    //
    // callback - params
    //
    // Returns null.
    AnalogSensor.prototype.start = function(callback) {
      var self = this;

      this.connection.analogRead(this.pin, function(readVal) {
        self.analogVal = readVal;
        self.device.emit('analogRead', readVal);

        if (readVal >= self.upperLimit) {
          self.device.emit('upperLimit', readVal);
        } else if (readVal <= self.lowerLimit) {
          self.device.emit('lowerLimit', readVal);
        }
      });

      return AnalogSensor.__super__.start.apply(this, arguments);
    };

    return AnalogSensor;

  })(Cylon.Driver);
});
