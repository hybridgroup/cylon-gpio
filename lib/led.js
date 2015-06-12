/*
 * LED driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

/**
 * A LED driver
 *
 * @constructor led
 *
 * @param {Object} opts options object
 * @param {String|Number} opts.pin the pin to connect to
 * @param {Number} opts.freq led frequency
 * @param {Object} [opts.pwmScale] pwm scale
 * @param {Number} opts.pwmScale.bottom pwm bottom
 * @param {Number} opts.pwmScale.top pwm top
 */
var Led = module.exports = function Led(opts) {
  Led.__super__.constructor.apply(this, arguments);

  this.freq = opts.freq || null;
  this.isHigh = false;
  this.brightnessValue = 0;
  this.pwmScale = opts.pwmScale || { bottom: 0, top: 255 };

  if (this.pin == null) {
    throw new Error("No pin specified for LED. Cannot proceed");
  }

  this.commands = {
    is_on: this.isOn,

    turn_on: this.turnOn,
    turn_off: this.turnOff,
    toggle: this.toggle,

    brightness: this.brightness,
    current_brightness: this.currentBrightness
  };
};

/** Subclasses the Cylon.Driver class */
Cylon.Utils.subclass(Led, Cylon.Driver);

/**
 * Starts the LED
 *
 * @param {Function} callback to be triggered when started
 * @return {void}
 */
Led.prototype.start = function(callback) {
  callback();
};

/**
 * Stops the LED
 *
 * @param {Function} callback to be triggered when halted
 * @return {void}
 */
Led.prototype.halt = function(callback) {
  callback();
};

/**
 * Writes a HIGH (1) value to the pin, turning the LED on.
 *
 * Also sets `this.isHigh` to `true`.
 *
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
Led.prototype.turnOn = function(callback) {
  this.isHigh = true;
  this.connection.digitalWrite(this.pin, 1, callback);
};

/**
 * Writes a LOW (0) value to the pin, turning the LED off.
 *
 * Also sets `this.isHigh` to `false`.
 *
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
Led.prototype.turnOff = function(callback) {
  this.isHigh = false;
  this.connection.digitalWrite(this.pin, 0, callback);
};

/**
 * Toggles the LED on or off, depending on its current state
 *
 * @param {Function} callback function to be invoked when done
 * @return {void}
 * @publish
 */
Led.prototype.toggle = function(callback) {
  if (this.isHigh) {
    this.turnOff();
  } else {
    this.turnOn();
  }

  if (typeof callback === "function") {
    callback();
  }
};

/**
 * Returns the current brightness of the LED.
 *
 * @param {Function} [callback] invoked with `err, value` as args
 * @return {Number} the current LED brightness value (0-255)
 * @publish
 */
Led.prototype.currentBrightness = function(callback) {
  if (typeof callback === "function") {
    callback(null, this.brightnessValue);
  }

  return this.brightnessValue;
};

/**
 * Sets brightness of the LED to the specified value using PWM.
 *
 * @param {Number} value - PWM value to set the brightness to (0-255)
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
Led.prototype.brightness = function(value, callback) {
  var scaledDuty = (value).fromScale(this.pwmScale.bottom, this.pwmScale.top);

  this.connection.pwmWrite(
    this.pin,
    scaledDuty,
    this.freq,
    null,
    null,
    callback
  );

  this.brightnessValue = value;
};

/**
 * Returns whether or not the LED is currently on
 *
 * @param {Function} [callback] invoked with `err, value` as args
 * @return {Boolean} whether or not the LED is currently on
 * @publish
 */
Led.prototype.isOn = function(callback) {
  if (typeof callback === "function") {
    callback(null, this.isHigh);
  }

  return this.isHigh;
};
