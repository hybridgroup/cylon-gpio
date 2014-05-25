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
  var extraParams = opts.extraParams || {};

  this.pin = this.device.pin;
  this.upperLimit = extraParams.upperLimit || 256;
  this.lowerLimit = extraParams.lowerLimit || 0;
  this.analogVal = null;
}

subclass(AnalogSensor, Cylon.Driver);

AnalogSensor.prototype.commands = function() {
  return ['analogRead'];
};

AnalogSensor.prototype.analogRead = function() {
  return this.analogVal;
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
