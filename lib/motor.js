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
 * @constructor motor
 *
 * @param {Object} opts options object
 * @param {String|Number} opts.pin the pin to connect to
 * @param {Number} opts.freq motor frequency
 * @param {Object} [opts.pwmScale] pwm scale
 * @param {Number} opts.pwmScale.bottom pwm scale bottom
 * @param {Number} opts.pwmScale.top pwm scale top
 * @param {String|Number} opts.directionPin the pin to use for motor direction
 */
var Motor = module.exports = function Motor(opts) {
  Motor.__super__.constructor.apply(this, arguments);

  this.freq = opts.freq || null;
  this.speedValue = 0;
  this.isOn = false;
  this.pwmScale = opts.pwmScale || { bottom: 0, top: 255 };
  this.directionPin = opts.directionPin;

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
 * @return {void}
 */
Motor.prototype.start = function(callback) {
  callback();
};

/**
 * Stops the Motor
 *
 * @param {Function} callback to be triggered when halted
 * @return {void}
 */
Motor.prototype.halt = function(callback) {
  callback();
};

/**
 * Turns the Motor on by writing a HIGH (1) value to the pin
 *
 * Also sets `this.isOn` to `true`.
 *
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
Motor.prototype.turnOn = function(callback) {
  this.isOn = true;
  this.connection.digitalWrite(this.pin, 1, callback);
};

/**
 * Turns the Motor off by writing a LOW (0) value to the pin
 *
 * Also sets `this.isOn` to `false`.
 *
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
Motor.prototype.turnOff = function(callback) {
  this.isOn = false;
  this.connection.digitalWrite(this.pin, 0, callback);
};

/**
 * Toggles the Motor on or off, depending on its current state
 *
 * @param {Function} [callback] invoked with `err, value` as args
 * @return {void}
 * @publish
 */
Motor.prototype.toggle = function(callback) {
  if (this.isOn) {
    this.turnOff();
  } else {
    this.turnOn();
  }

  if (typeof callback === "function") {
    callback();
  }
};

/**
 * Returns the Motor's current speed value
 *
 * @param {Function} [callback] - (err, val)
 * @return {Number} the current motor speed
 * @publish
 */
Motor.prototype.currentSpeed = function(callback) {
  if (typeof callback === "function") {
    callback(null, this.speedValue);
  }

  return this.speedValue;
};

/**
 * Sets the Motor's speed to the PWM value provided (0-255)
 *
 * @param {Number} value PWM value to set the speed to (0-255)
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
Motor.prototype.speed = function(value, callback) {
  var scaledDuty = (value).fromScale(this.pwmScale.bottom, this.pwmScale.top);

  this.connection.pwmWrite(
    this.pin,
    scaledDuty,
    callback
  );

  this.speedValue = value;
  this.isOn = this.speedValue > 0;
};

/**
 * Sets the Motor direction
 *
 * @param {Number} direction direction 1 forward, 0 backward
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
Motor.prototype.setDirection = function(direction, callback) {
  this.connection.digitalWrite(this.directionPin, direction, callback);
};

/**
 * Sets the Motor to forward by writing a HIGH (1) value to the direction pin
 *
 * @param {Number} speed speed to go
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
Motor.prototype.forward = function(speed, callback) {
  this.setDirection(1);
  this.speed(speed, callback);
};

/**
 * Sets the Motor to backward by writing a LOW (0) value to the direction pin
 *
 * @param {Number} speed speed to go
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
Motor.prototype.backward = function(speed, callback) {
  this.setDirection(0);
  this.speed(speed, callback);
};
