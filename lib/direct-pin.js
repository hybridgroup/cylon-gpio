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
 * @constructor DirectPin
 *
 * @param {Object} opts options object
 * @param {String|Number} opts.pin the pin to connect to
 */
var DirectPin = module.exports = function DirectPin() {
  DirectPin.__super__.constructor.apply(this, arguments);

  this.readSet = false;
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
 * @return {void}
 */
DirectPin.prototype.start = function(callback) {
  callback();
};

/**
 * Stops the Direct Pin
 *
 * @param {Function} callback to be triggered when stopped
 * @return {void}
 */
DirectPin.prototype.halt = function(callback) {
  callback();
};

/**
 * Writes a digital value to the pin
 *
 * @param {Number} value value to write to the pin
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
DirectPin.prototype.digitalWrite = function(value, callback) {
  this.connection.digitalWrite(this.pin, value, callback);
};

/**
 * Writes an analog value to the pin
 *
 * @param {Number} value value to write to the pin
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
DirectPin.prototype.analogWrite = function(value, callback) {
  this.connection.analogWrite(this.pin, value, callback);
};

/**
 * Reads the value from the pin
 *
 * Triggers the provided callback when the pin state has been read.
 *
 * @param {Function} callback triggered when the pin state has been read
 * @return {void}
 * @publish
 */
DirectPin.prototype.digitalRead = function(callback) {
  this._read("d", callback);
};

/**
 * Reads the value from the pin
 *
 * Triggers the provided callback when the pin state has been read.
 *
 * @param {Function} callback triggered when the pin state has been read
 * @return {void}
 * @publish
 */
DirectPin.prototype.analogRead = function(callback) {
  this._read("a", callback);
};

DirectPin.prototype._read = function(type, callback) {
  if (!this.readSet) {
    switch (type) {
      case "a":
        this.connection.analogRead(this.pin, callback);
        break;
      case "d":
        this.connection.digitalRead(this.pin, callback);
        break;
    }

    this.readSet = true;
  }
};

/**
 * Writes a servo value to the pin
 *
 * @param {Number} angle angle value to write to the pin
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
DirectPin.prototype.servoWrite = function(angle, callback) {
  return this.connection.servoWrite(this.pin, angle, callback);
};

/**
 * Writes a PWM value to the pin
 *
 * @param {Number} value value to write to the pin
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
DirectPin.prototype.pwmWrite = function(value, callback) {
  return this.connection.pwmWrite(this.pin, value, callback);
};
