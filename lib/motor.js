/*
 * Motor driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

/**
 * A Motor driver
 *
 * @constructor
 *
 * @param {Object} opts
 * @param {String|Number} opts.pin the pin to connect to
 * @param {Number} opts.freq
 * @param {Object=} opts.pwmScale
 * @param {Number} opts.pwmScale.bottom
 * @param {Number} opts.pwmScale.top
 */
var Motor = module.exports = function Motor(opts) {
  Motor.__super__.constructor.apply(this, arguments);

  this.freq = opts.freq || null;
  this.speedValue = 0;
  this.isOn = false;
  this.pwmScale = opts.pwmScale || { bottom: 0, top: 255 };

  if (this.pin == null) {
    throw new Error("No pin specified for Motor. Cannot proceed");
  }

  this.commands = {
    turn_on: this.turnOn,
    turn_off: this.turnOff,
    toggle: this.toggle,
    speed: this.speed,
    current_speed: this.currentSpeed
  };
};

/** Subclasses the Cylon.Driver class */
Cylon.Utils.subclass(Motor, Cylon.Driver);

/**
 * Starts the Motor
 *
 * @param {Function} callback to be triggered when started
 * @return {null}
 */
Motor.prototype.start = function(callback) {
  callback();
};

/**
 * Stops the Motor
 *
 * @param {Function} callback to be triggered when halted
 * @return {null}
 */
Motor.prototype.halt = function(callback) {
  callback();
};

/**
 * Turns the Motor on by writing a HIGH (1) value to the pin
 *
 * Also sets `this.isOn` to `true`.
 *
 * @return {null}
 * @publish
 */
Motor.prototype.turnOn = function() {
  this.isOn = true;
  this.connection.digitalWrite(this.pin, 1);
};

/**
 * Turns the Motor off by writing a LOW (0) value to the pin
 *
 * Also sets `this.isOn` to `false`.
 *
 * @return {null}
 * @publish
 */
Motor.prototype.turnOff = function() {
  this.isOn = false;
  this.connection.digitalWrite(this.pin, 0);
};

/**
 * Toggles the Motor on or off, depending on its current state
 *
 * @return {null}
 * @publish
 */
Motor.prototype.toggle = function() {
  if (this.isOn) {
    this.turnOff();
  } else {
    this.turnOn();
  }
};

/**
 * Returns the Motor's current speed value
 *
 * @return {Number} the current motor speed
 * @publish
 */
Motor.prototype.currentSpeed = function() {
  return this.speedValue;
};

// Public: Sets the speed of the motor to the value provided in the
// speed param, speed value must be an integer between 0 and 255.
//
// value- params
//
// Returns integer.

/**
 * Sets the Motor's speed to the PWM value provided (0-255)
 *
 * @param {Number} value PWM value to set the speed to (0-255)
 * @return {null}
 * @publish
 */
Motor.prototype.speed = function(value) {
  var scaledDuty = (value).fromScale(this.pwmScale.bottom, this.pwmScale.top);

  this.connection.pwmWrite(this.pin, scaledDuty, this.freq);
  this.speedValue = value;
  this.isOn = this.speedValue > 0;
};
