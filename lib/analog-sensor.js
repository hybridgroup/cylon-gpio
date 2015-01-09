/*
 * Analog Sensor driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

var events = [
  /**
   * Emitted when the Analog Sensor has fetched a new value
   *
   * @event analogRead
   */
  "analogRead",

  /**
   * Emitted when the Analog Sensor reads a value above the specified upper
   * limit
   *
   * @event upperLimit
   */
  "upperLimit",

  /**
   * Emitted when the Analog Sensor reads a value below the specified lower
   * limit
   *
   * @event lowerLimit
   */
  "lowerLimit"
];

/**
 * An Analog Sensor driver
 *
 * @constructor
 *
 * @param {Object} opts
 * @param {String|Number} opts.pin the pin to connect to
 * @param {Number=} opts.upperLimit
 * @param {Number=} opts.lowerLimit
 */
var AnalogSensor = module.exports = function AnalogSensor(opts) {
  AnalogSensor.__super__.constructor.apply(this, arguments);

  this.upperLimit = opts.upperLimit || 256;
  this.lowerLimit = opts.lowerLimit || 0;
  this.analogVal = null;

  if (this.pin == null) {
    throw new Error("No pin specified for Analog Sensor. Cannot proceed");
  }

  this.commands = {
    analog_read: this.analogRead
  };

  this.events = events;
};

/** Subclasses the Cylon.Driver class */
Cylon.Utils.subclass(AnalogSensor, Cylon.Driver);

/**
 * Gets the current value from the Analog Sensor
 *
 * @return {Number} the current `this.analogVal`
 * @publish
 */
AnalogSensor.prototype.analogRead = function() {
  return this.analogVal;
};

/**
 * Starts the Analog Sensor
 *
 * @param {Function} callback to be triggered when started
 * @return {null}
 */
AnalogSensor.prototype.start = function(callback) {
  this.connection.analogRead(this.pin, function(err, readVal) {
    this.analogVal = readVal;
    this.emit("analogRead", readVal);

    if (readVal >= this.upperLimit) {
      this.emit("upperLimit", readVal);
    } else if (readVal <= this.lowerLimit) {
      this.emit("lowerLimit", readVal);
    }
  }.bind(this));

  callback();
};

/**
 * Stops the Analog Sensor
 *
 * @param {Function} callback to be triggered when stopped
 * @return {null}
 * @api private
 */
AnalogSensor.prototype.halt = function(callback) {
  callback();
};
