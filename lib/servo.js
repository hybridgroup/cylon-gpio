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
 * @constructor Servo
 *
 * @param {Object} opts options object
 * @param {String|Number} opts.pin the pin to connect to
 * @param {Object} [opts.range] range min/max
 * @param {Number} opts.range.min range min
 * @param {Number} opts.range.max range max
 * @param {Object} [opts.pulseWidth] pulse width min/max
 * @param {Number} opts.pulseWidth.min pulse width min
 * @param {Number} opts.pulseWidth.max pulse width min
 * @param {Object} [opts.pwmScale] PWM scale bottom/top
 * @param {Number} opts.pwmScale.bottom PWM scale bottom
 * @param {Number} opts.pwmScale.top PWM scale top
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
 * @return {void}
 */
Servo.prototype.start = function(callback) {
  callback();
};

/**
 * Stop the Servo
 *
 * @param {Function} callback to be triggered when halted
 * @return {void}
 */
Servo.prototype.halt = function(callback) {
  callback();
};

/**
 * Returns the current angle of the Servo
 *
 * @param {Function} callback function to be invoked with angle value
 * @return {Number} the current servo angle value (0-180)
 * @publish
 */
Servo.prototype.currentAngle = function(callback) {
  if (typeof callback === "function") {
    callback(null, this.angleValue);
  }

  return this.angleValue;
};

/**
 * Sets the angle of the servo to the provided value
 *
 * @param {Number} value - the angle to point the servo to (0-180)
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
Servo.prototype.angle = function(value, callback) {
  var scaledDuty = (this.safeAngle(value)).fromScale(
    this.pwmScale.bottom,
    this.pwmScale.top
  );

  this.connection.servoWrite(
    this.pin,
    scaledDuty,
    this.freq,
    this.pulseWidth,
    callback
  );
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
  } else if (value > this.angleRange.max) {
    value = this.angleRange.max;
  }

  return value;
};
