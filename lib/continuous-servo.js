/*
 * Continuous Servo driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require('cylon');

var ContinuousServo = module.exports = function ContinuousServo() {
  ContinuousServo.__super__.constructor.apply(this, arguments);
  this.pin = this.device.pin;
  this.angleValue = 0;
}

Cylon.Utils.subclass(ContinuousServo, Cylon.Driver);

ContinuousServo.prototype.commands = ['clockwise', 'counterClockwise', 'stop'];

// Public: Stops the driver
//
// Returns null.
ContinuousServo.prototype.stop = function() {
  return this.connection.servoWrite(this.pin, 90);
};

// Public: Turns the servo to go clockwise, if the driver is continuous.
//
// Returns true | nil.
ContinuousServo.prototype.clockwise = function() {
  Cylon.Logger.debug("Servo on pin " + this.pin + " turning clockwise");
  return this.connection.servoWrite(this.pin, 180);
};

// Public: Turns the servo to go counter clockwise, if the driver is continuous.
//
// Returns true | nil.
ContinuousServo.prototype.counterClockwise = function() {
  Cylon.Logger.debug("Servo on pin " + this.pin + " turning counter clockwise");
  return this.connection.servoWrite(this.pin, 89);
};
