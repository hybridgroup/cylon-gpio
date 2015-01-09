/*
 * Servo driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

/**
 * A Servo driver
 *
 * @constructor
 *
 * @param {Object} opts
 * @param {String|Number} opts.pin the pin to connect to
 * @param {Object=} opts.range
 * @param {Number} opts.range.min
 * @param {Number} opts.range.max
 * @param {Object=} opts.pulseWidth
 * @param {Number} opts.pulseWidth.min
 * @param {Number} opts.pulseWidth.max
 * @param {Object=} opts.pwmScale
 * @param {Number} opts.pwmScale.bottom
 * @param {Number} opts.pwmScale.top
 */
var Servo = module.exports = function Servo(opts) {
  Servo.__super__.constructor.apply(this, arguments);

  this.angleValue = 0;

  this.angleRange = opts.range || { min: 20, max: 160 };
  this.freq = opts.freq || null;
  this.pulseWidth = opts.pulseWidth || { min: 500, max: 2400 };
  this.pwmScale = opts.pwmScale || { bottom: 0, top: 180 };

  if (this.pin == null) {
    throw new Error("No pin specified for Servo. Cannot proceed");
  }

  this.commands = {
    angle: this.angle,
    current_angle: this.currentAngle
  };
};

/** Subclasses the Cylon.Driver class */
Cylon.Utils.subclass(Servo, Cylon.Driver);

/**
 * Starts the Servo
 *
 * @param {Function} callback to be triggered when started
 * @return {null}
 */
Servo.prototype.start = function(callback) {
  callback();
};

/**
 * Stop the Servo
 *
 * @param {Function} callback to be triggered when halted
 * @return {null}
 */
Servo.prototype.halt = function(callback) {
  callback();
};

/**
 * Returns the current angle of the Servo
 *
 * @return {Number} the current servo angle value (0-180)
 * @publish
 */
Servo.prototype.currentAngle = function() {
  return this.angleValue;
};

/**
 * Sets the angle of the servo to the provided value
 *
 * @param {Number} value the angle to point the servo to (0-180)
 * @return {null}
 * @publish
 */
Servo.prototype.angle = function(value) {
  var scaledDuty = (this.safeAngle(value)).fromScale(
    this.pwmScale.bottom,
    this.pwmScale.top
  );

  this.connection.servoWrite(this.pin, scaledDuty, this.freq, this.pulseWidth);
  this.angleValue = value;
};

// Public: Saves an specified angle, angle must be an
// integer value between 0 and 180.
//
// value - params
//
// Returns null.

/**
 * Given a servo angle, determines if it's safe or not, and returns a safe value
 *
 * @param {Number} value the angle the user wants to set the servo to
 * @return {Number} a made-safe angle to set the servo to
 * @publish
 */
Servo.prototype.safeAngle = function(value) {
  if (value < this.angleRange.min) {
    value = this.angleRange.min;
  } else {
    if (value > this.angleRange.max) {
      value = this.angleRange.max;
    }
  }
  return value;
};
