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
 * @constructor continuous-servo
 *
 * @param {Object} opts
 * @param {String|Number} opts.pin the pin to connect to
 */
var ContinuousServo = module.exports = function ContinuousServo() {
  ContinuousServo.__super__.constructor.apply(this, arguments);
  this.angleValue = 0;

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
 * @return {null}
 */
ContinuousServo.prototype.start = function(callback) {
  callback();
};

/**
 * Stops the Continuous Servo
 *
 * @param {Function} callback to be triggered when stopped
 * @return {null}
 */
ContinuousServo.prototype.halt = function(callback) {
  callback();
};

/**
 * Stops the Continuous Servo's rotation
 *
 * @return {Boolean|null}
 * @publish
 */
ContinuousServo.prototype.stop = function() {
  return this.connection.servoWrite(this.pin, 90);
};

/**
 * Rotates the Continuous Servo clockwise
 *
 * @return {Boolean|null}
 * @publish
 */
ContinuousServo.prototype.clockwise = function() {
  return this.rotate("clockwise");
};

/**
 * Rotates the Continuous Servo counter-clockwise
 *
 * @return {Boolean|null}
 * @publish
 */
ContinuousServo.prototype.counterClockwise = function() {
  return this.rotate("counter-clockwise");
};

/**
 * Rotates the Continuous Servo
 *
 * @return {Boolean|null}
 * @publish
 */
ContinuousServo.prototype.rotate = function(direction) {
  var spin = (direction === "clockwise") ? 180 : 89;

  return this.connection.servoWrite(this.pin, spin);
};
