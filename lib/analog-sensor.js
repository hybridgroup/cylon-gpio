/*
 * Analog Sensor driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require('cylon');

var AnalogSensor = module.exports = function AnalogSensor(opts) {
  AnalogSensor.__super__.constructor.apply(this, arguments);

  this.upperLimit = opts.upperLimit || 256;
  this.lowerLimit = opts.lowerLimit || 0;
  this.analogVal = null;

  if (this.pin == null) {
    throw new Error("No pin specified for Analog Sensor. Cannot proceed")
  }

  this.commands = {
    analog_read: this.analogRead
  };
};

Cylon.Utils.subclass(AnalogSensor, Cylon.Driver);

AnalogSensor.prototype.analogRead = function() {
  return this.analogVal;
};

// Public: Starts the driver
//
// callback - params
//
// Returns null.
AnalogSensor.prototype.start = function(callback) {
  this.connection.analogRead(this.pin, function(err, readVal) {
    this.analogVal = readVal;
    this.emit('analogRead', readVal);

    if (readVal >= this.upperLimit) {
      this.emit('upperLimit', readVal);
    } else if (readVal <= this.lowerLimit) {
      this.emit('lowerLimit', readVal);
    }
  }.bind(this));

  callback();
};

AnalogSensor.prototype.halt = function(callback) {
  callback();
};
