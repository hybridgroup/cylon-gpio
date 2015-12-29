/*
 * RGB LED strip driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2015 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

/**
 * RGB LED driver
 *
 * @constructor led
 *
 * @param {Object} opts options object
 * @param {String|Number} opts.redPin the red pin to connect to
 * @param {String|Number} opts.greenPin the green pin to connect to
 * @param {String|Number} opts.bluePin the blue pin to connect to
 * @param {Boolean} opts.cathode when true all pin outputs will be negated from
 *                               255, defaults to false
 */
var RGBLed = module.exports = function RGBLed(opts) {
  RGBLed.__super__.constructor.apply(this, arguments);

  this.redPin = opts.redPin || null;
  this.greenPin = opts.greenPin || null;
  this.bluePin = opts.bluePin || null;

  this.cathode = opts.cathode || false;

  if (this.redPin == null) {
    throw new Error("No red pin specified for RGB LED. Cannot proceed");
  }

  if (this.greenPin == null) {
    throw new Error("No green pin specified for RGB LED. Cannot proceed");
  }

  if (this.bluePin == null) {
    throw new Error("No blue pin specified for RGB LED. Cannot proceed");
  }

  this.commands = {
    is_on: this.isOn,
    set_rgb: this.setRGB
  };
};

/** Subclasses the Cylon.Driver class */
Cylon.Utils.subclass(RGBLed, Cylon.Driver);

/**
 * Starts the RGBLed
 *
 * @param {Function} callback to be triggered when started
 * @return {void}
 */
RGBLed.prototype.start = function(callback) {
  callback();
};

/**
 * Stops the RGBLed
 *
 * @param {Function} callback to be triggered when halted
 * @return {void}
 */
RGBLed.prototype.halt = function(callback) {
  callback();
};

/**
 * Sets the RGB LED to a specific color
 *
 * @param {Number} hex value for the LED e.g. 0xff00ff
 * @param {Function} callback to be triggered when complete
 * @return {void}
 * @publish
 */
RGBLed.prototype.setRGB = function(hex, callback) {
  var val = this._hexToRgb(hex);
  this.isHigh = true;
  this.connection.pwmWrite(this.redPin, this._negateOnCathode(val.r));
  this.connection.pwmWrite(this.greenPin, this._negateOnCathode(val.g));
  this.connection.pwmWrite(this.bluePin, this._negateOnCathode(val.b));

  if (typeof callback === "function") {
    callback(null, val);
  }
};

/**
 * Returns whether or not the RGB LED is currently on
 *
 * @param {Function} callback function to invoke with isOn value
 * @return {Boolean} whether or not the LED is currently on
 * @publish
 */
RGBLed.prototype.isOn = function(callback) {
  if (typeof callback === "function") {
    callback(null, this.isHigh);
  }

  return this.isHigh;
};

RGBLed.prototype._negateOnCathode = function(val) {
  var outVal;
  if (this.cathode) {
    outVal = 255 - val;
  } else {
    outVal = val;
  }
  return outVal;
};

RGBLed.prototype._hexToRgb = function(hex) {
  var param = hex.toString(16);
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(param);

  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
  }

  return { r: 0, g: 0, b: 0 };
};
