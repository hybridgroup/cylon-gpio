/*
 * SHARP IR Range Sensor driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var namespace = require('node-namespace');

require('./cylon-gpio');

namespace("Cylon.Drivers.GPIO", function() {
  this.IrRangeSensor = (function(klass) {
    subclass(IrRangeSensor, klass);

    function IrRangeSensor(opts) {
      IrRangeSensor.__super__.constructor.apply(this, arguments);
    }

    IrRangeSensor.prototype.analogRead = function() {
      return this.analogVal;
    };

    return IrRangeSensor;

  })(Cylon.Drivers.GPIO.AnalogSensor);
});
