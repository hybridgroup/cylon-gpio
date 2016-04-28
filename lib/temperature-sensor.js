/*
 * Temperature sensor driver for analog thermistor based sensors
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2016 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

/* eslint camelcase: 0 */

"use strict";

var Cylon = require("cylon");

var AnalogSensor = require("./analog-sensor");

/**
 * A TemperatureSensor Driver
 *
 * @constructor temperature
 * @param {Object} opts options object
 * @param {String|Number} opts.bValue the bValue for thermistor

 */
var TemperatureSensor = module.exports = function TemperatureSensor(opts) {
  TemperatureSensor.__super__.constructor.apply(this, arguments);

  this.bValue = opts.bValue || 4275;
  this.commands = {
    celsius: this.celsius
  };
};

Cylon.Utils.subclass(TemperatureSensor, AnalogSensor);

/**
 * Gets the current value from the Analog Sensor
 *
 * @param {Function} [callback] invoked with `err, value` as args
 * @return {Number} the current temperature value
 * @publish
 */
TemperatureSensor.prototype.celsius = function(callback) {
  var val = this.analogVal;
  var r = (1023 - val) * 10000 / val;
  var t = 1 / (Math.log(r / 10000) / this.bValue + 1 / 298.15) - 273.15;
  var temp = Math.round(t);

  if (typeof callback === "function") {
    callback(null, temp);
  }

  return temp;
};
