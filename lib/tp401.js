/*
 * TP401 driver for gas detection
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
 * A TP401 Driver
 *
 * @constructor temperature
 */
var TP401 = module.exports = function TP401() {
  TP401.__super__.constructor.apply(this, arguments);

  this.commands = {
    ppm: this.ppm
  };
};

Cylon.Utils.subclass(TP401, AnalogSensor);

/**
 * Gets the current ppm reading from the TP401
 *
 * @param {Function} [callback] invoked with `err, value` as args
 * @return {Number} the current PPM value
 * @publish
 */
TP401.prototype.ppm = function(callback) {
  var val = Math.ceil(25.0 * this.analogVal / 1023.0);

  if (typeof callback === "function") {
    callback(null, val);
  }

  return val;
};
