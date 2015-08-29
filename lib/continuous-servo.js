/*
 * Continuous Servo driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

/**
 * A Continuous Servo driver
 *
 * @constructor ContinuousServo
 *
 * @param {Object} opts options object
 * @param {String|Number} opts.pin the pin to connect to
 */
var ContinuousServo = module.exports = function(opts) {
  ContinuousServo.__super__.constructor.apply(this, arguments);

  this.angleValue = 0;
  this.freq = opts.freq || null;
  this.pwmScale = opts.pwmScale || { bottom: 0, top: 180 };
  this.pulseWidth = opts.pulseWidth || { min: 500, max: 2400 };

  if (this.pin == null) {
    throw new Error("No pin specified for Continuous Servo. Cannot proceed");
  }

  this.commands = {
    clockwise: this.clockwise,
    counter_clockwise: this.counterClockwise,
    stop: this.stop
  };
};

/** Subclasses the Cylon.Driver class */
Cylon.Utils.subclass(ContinuousServo, Cylon.Driver);

/**
 * Starts the Continuous Servo
 *
 * @param {Function} callback to be triggered when started
 * @return {void}
 */
ContinuousServo.prototype.start = function(callback) {
  callback();
};

/**
 * Stops the Continuous Servo
 *
 * @param {Function} callback to be triggered when stopped
 * @return {void}
 */
ContinuousServo.prototype.halt = function(callback) {
  callback();
};

/**
 * Stops the Continuous Servo's rotation
 *
 * @param {Function} callback (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
ContinuousServo.prototype.stop = function(callback) {
  var scaledDuty = (90).fromScale(
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
};

/**
 * Rotates the Continuous Servo clockwise
 *
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
ContinuousServo.prototype.clockwise = function(callback) {
  return this.rotate("clockwise", callback);
};

/**
 * Rotates the Continuous Servo counter-clockwise
 *
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
ContinuousServo.prototype.counterClockwise = function(callback) {
  return this.rotate("counter-clockwise", callback);
};

/**
 * Rotates the Continuous Servo
 *
 * @param {String} direction 'clockwise' or 'counter-clockwise'
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
ContinuousServo.prototype.rotate = function(direction, callback) {
  var spin = (direction === "clockwise") ? 180 : 0;

  var scaledDuty = (spin).fromScale(
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
};
