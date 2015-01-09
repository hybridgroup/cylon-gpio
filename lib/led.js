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
 * @constructor
 *
 * @param {Object} opts
 * @param {String|Number} opts.pin the pin to connect to
 * @param {Number} opts.freq
 * @param {Object=} opts.pwmScale
 * @param {Number} opts.pwmScale.bottom
 * @param {Number} opts.pwmScale.top
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
 * @return {null}
 */
Led.prototype.start = function(callback) {
  callback();
};

/**
 * Stops the LED
 *
 * @param {Function} callback to be triggered when halted
 * @return {null}
 */
Led.prototype.halt = function(callback) {
  callback();
};

/**
 * Writes a HIGH (1) value to the pin, turning the LED on.
 *
 * Also sets `this.isHigh` to `true`.
 *
 * @return {null}
 * @publish
 */
Led.prototype.turnOn = function() {
  this.isHigh = true;
  this.connection.digitalWrite(this.pin, 1);
};

/**
 * Writes a LOW (0) value to the pin, turning the LED off.
 *
 * Also sets `this.isHigh` to `false`.
 *
 * @return {null}
 * @publish
 */
Led.prototype.turnOff = function() {
  this.isHigh = false;
  this.connection.digitalWrite(this.pin, 0);
};

/**
 * Toggles the LED on or off, depending on its current state
 *
 * @return {null}
 * @publish
 */
Led.prototype.toggle = function() {
  if (this.isHigh) {
    this.turnOff();
  } else {
    this.turnOn();
  }
};

/**
 * Returns the current brightness of the LED.
 *
 * @return {Number} the current LED brightness value (0-255)
 * @publish
 */
Led.prototype.currentBrightness = function() {
  return this.brightnessValue;
};

/**
 * Sets brightness of the LED to the specified value using PWM.
 *
 * @param {Number} value PWM value to set the brightness to (0-255)
 * @return {null}
 * @publish
 */
Led.prototype.brightness = function(value) {
  var scaledDuty = (value).fromScale(this.pwmScale.bottom, this.pwmScale.top);

  this.connection.pwmWrite(this.pin, scaledDuty, this.freq);
  this.brightnessValue = value;
};

/**
 * Returns whether or not the LED is currently on
 *
 * @return {Boolean} whether or not the LED is currently on
 * @publish
 */
Led.prototype.isOn = function(){
  return this.isHigh;
};
