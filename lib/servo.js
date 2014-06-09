/*
 * Servo driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require('cylon');

var Servo = module.exports = function Servo(opts) {
  Servo.__super__.constructor.apply(this, arguments);
  this.pin = this.device.pin;
  this.angleValue = 0;
  this.angleLimits = opts.extraParams.angleLimits || { bottom: 20, top: 160 };
  this.freq = opts.extraParams.freq;
  this.pulseWidth = opts.extraParams.pulseWidth || { min: 500, max: 2400 };
  this.rotationalRange = opts.extraParams.rotationalRange || { bottom: 0, top: 180 };
}

Cylon.Utils.subclass(Servo, Cylon.Driver);

Servo.prototype.commands = function() {
  return ['angle', 'currentAngle'];
};

// Public: Returns the current angle of the servo, an integer value
// between 0 and 180.
//
// Returns an integer.
Servo.prototype.currentAngle = function() {
  return this.angleValue;
};

// Public: Moves the servo to the specified angle, angle must be an
// integer value between 0 and 180.
//
// value - params
//
// Returns null.
Servo.prototype.angle = function(value) {
  var scaledDuty = (this.safeAngle(value)).fromScale(this.rotationalRange.bottom, this.rotationalRange.top);

  this.connection.servoWrite(this.pin, scaledDuty, this.freq, this.pulseWidth);
  this.angleValue = value;
};

// Public: Saves an specified angle, angle must be an
// integer value between 0 and 180.
//
// value - params
//
// Returns null.
Servo.prototype.safeAngle = function(value) {
  if (value < this.angleLimits.bottom) {
      value = this.angleLimits.bottom;
  } else {
    if (value > this.angleLimits.top) {
      value = this.angleLimits.top;
    }
  }
  return value;
};
