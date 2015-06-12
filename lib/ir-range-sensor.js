/*
 * SHARP IR Range Sensor driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");
var path = require("path");

var events = [
  /**
   * Emitted when the IR Range Sensor has detected the current range
   *
   * @event range
   * @value distance the current distance in inches
   */
  "range",

  /**
   * Emitted when the IR Range Sensor has detected the current range
   *
   * @event rangeCm
   * @value distance the current distance in centimeters
   */
  "rangeCm",
];

/**
 * A IR Range Sensor driver
 *
 * @constructor IrRangeSensor
 *
 * @param {Object} opts options object
 * @param {String|Number} opts.pin the pin to connect to
 * @param {String} opts.model the IR Range Sensor model number
 */
var IrRangeSensor = module.exports = function IrRangeSensor(opts) {
  IrRangeSensor.__super__.constructor.apply(this, arguments);

  this.model = opts.model;
  this.analogVal = 0;
  this.distanceCm = 0;
  this.distanceIn = 0;

  if (this.pin == null) {
    throw new Error("No pin specified for IR Range Sensor. Cannot proceed");
  }

  this._setRangeTable();

  this.commands = {
    analog_read: this.analogRead,
    range_cm: this.rangeCm,
    range: this.range
  };

  this.events = events;
};

Cylon.Utils.subclass(IrRangeSensor, Cylon.Driver);

IrRangeSensor.prototype._setRangeTable = function() {
  if (this.model) {
    var model = path.join(
      __dirname,
      "./ir_range_tables/" + this.model.toLowerCase() + ".js"
    );

    this.rangeTable = require(model);
  } else {
    this.rangeTable = {};

    var str = "IRSensor CANNOT calculate distance (range and rangecm) without ";
    str += "IR model number.\n";
    str += "Only analogRead() values will be available.\n";
    str += "To generate a distance range table, check ./node_modules";
    str += "/cylon-gpio/utilities/generate-ir-rage-sensor-table.js.\n";
    str += "Try passing model number as a device parameter.";
    Cylon.Logger.info(str);
  }
};
/**
 * Starts the IR Range Sensor
 *
 * @param {Function} callback to be triggered when started
 * @return {void}
 */
IrRangeSensor.prototype.start = function(callback) {
  this.connection.analogRead(this.pin, function(err, readVal) {
    if (err) { return; }
    this._calcDistances(readVal);
    this.emit("range", this.distanceIn);
    this.emit("rangeCm", this.distanceCm);
  }.bind(this));

  callback();
};

/**
 * Stops the IR Range Sensor
 *
 * @param {Function} callback to be triggered when stopped
 * @return {void}
 */
IrRangeSensor.prototype.halt = function(callback) {
  callback();
};

/**
 * Uses the range table to calculate distances
 *
 * Uses the calculated distance to set `this.analogVal`, `this.distanceCm`, and
 * `this.distanceIn`
 *
 * @param {Number} analogVal value to calculate distance for
 * @return {void}
 */
IrRangeSensor.prototype._calcDistances = function(analogVal) {
  var distance = 0,
      tmpRange = 0;

  for (var range in this.rangeTable.rangeDistances) {
    tmpRange = parseInt(range, 10);
    if ((analogVal <= tmpRange) && (analogVal + 5 > tmpRange)) {
      distance = this.rangeTable.rangeDistances[range].dist;
      break;
    }
  }

  this.analogVal = analogVal;
  this.distanceCm = distance;
  this.distanceIn = distance / 2.54;
};

/**
 * Returns the current analog value from the pin
 *
 * @param {Function} [callback] invoked with `err, value` as args
 * @return {Number} current analog value, or 0 if it's not been read yet
 * @publish
 */
IrRangeSensor.prototype.analogRead = function(callback) {
  var val = this.analogVal || 0;

  if (typeof callback === "function") {
    callback(null, val);
  }

  return val;
};

/**
 * Returns the current range, in centimeters
 *
 * @param {Function} [callback] invoked with `err, value` as args
 * @return {Number} current detected range in centimeters
 * @publish
 */
IrRangeSensor.prototype.rangeCm = function(callback) {
  if (typeof callback === "function") {
    callback(null, this.distanceCm);
  }

  return this.distanceCm;
};

/**
 * Returns the current range, in inches
 *
 * @param {Function} [callback] invoked with `err, value` as args
 * @return {Number} current detected range in inches
 * @publish
 */
IrRangeSensor.prototype.range = function(callback) {
  if (typeof callback === "function") {
    callback(null, this.distanceIn);
  }

  return this.distanceIn;
};
