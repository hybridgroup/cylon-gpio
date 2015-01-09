/*
 * DirectPin driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

/**
 * A Direct Pin driver
 *
 * @constructor
 *
 * @param {Object} opts
 * @param {String|Number} opts.pin the pin to connect to
 */
var DirectPin = module.exports = function DirectPin() {
  DirectPin.__super__.constructor.apply(this, arguments);

  this.dReadSet = false;
  this.aReadSet = false;
  this.high = false;

  if (this.pin == null) {
    throw new Error("No pin specified for Direct Pin. Cannot proceed");
  }

  this.commands = {
    digital_read: this.digitalRead,
    digital_write: this.digitalWrite,

    analog_read: this.analogRead,
    analog_write: this.analogWrite,

    pwm_write: this.pwmWrite,
    servo_write: this.servoWrite,
  };
};

/** Subclasses the Cylon.Driver class */
Cylon.Utils.subclass(DirectPin, Cylon.Driver);

/**
 * Starts the Direct Pin
 *
 * @param {Function} callback to be triggered when started
 * @return {null}
 */
DirectPin.prototype.start = function(callback) {
  callback();
};

/**
 * Stops the Direct Pin
 *
 * @param {Function} callback to be triggered when stopped
 * @return {null}
 */
DirectPin.prototype.halt = function(callback) {
  callback();
};

/**
 * Writes a digital value to the pin
 *
 * @param {Number} value value to write to the pin
 * @return {null}
 * @publish
 */
DirectPin.prototype.digitalWrite = function(value) {
  this.connection.digitalWrite(this.pin, value);
};

/**
 * Reads the value from the pin
 *
 * Triggers the provided callback when the pin state has been read.
 *
 * @param {Function} callback triggered when the pin state has been read
 * @return {null}
 * @publish
 */
DirectPin.prototype.digitalRead = function(callback) {
  if (!this.dReadSet) {
    this.connection.digitalRead(this.pin, callback);
  }
  this.dReadSet = true;
};

/**
 * Writes an analog value to the pin
 *
 * @param {Number} value value to write to the pin
 * @return {null}
 * @publish
 */
DirectPin.prototype.analogWrite = function(value) {
  this.connection.analogWrite(this.pin, value);
};

/**
 * Reads the value from the pin
 *
 * Triggers the provided callback when the pin state has been read.
 *
 * @param {Function} callback triggered when the pin state has been read
 * @return {null}
 * @publish
 */
DirectPin.prototype.analogRead = function(callback) {
  if (!this.aReadSet) {
    this.connection.analogRead(this.pin, callback);
  }
  this.aReadSet = true;
};
// Public: ServoWrite

/**
 * Writes a servo value to the pin
 *
 * @param {Number} value value to write to the pin
 * @return {null}
 * @publish
 */
DirectPin.prototype.servoWrite = function(angle) {
  return this.connection.servoWrite(this.pin, angle);
};

/**
 * Writes a PWM value to the pin
 *
 * @param {Number} value value to write to the pin
 * @return {null}
 * @publish
 */
DirectPin.prototype.pwmWrite = function(value) {
  return this.connection.pwmWrite(this.pin, value);
};
