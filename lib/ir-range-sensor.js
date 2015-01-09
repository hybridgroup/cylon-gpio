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
 * @constructor
 *
 * @param {Object} opts
 * @param {String|Number} opts.pin the pin to connect to
 * @param {String} opts.model the IR Range Sensor model number
 */
var IrRangeSensor = module.exports = function IrRangeSensor(opts) {
  IrRangeSensor.__super__.constructor.apply(this, arguments);

  if (opts.model) {
    var model = path.join(
      __dirname,
      "./ir_range_tables/" + opts.model.toLowerCase() + ".js"
    );

    this.rangeTable = require(model);
  } else {
    this.rangeTable = {};

    var str = "IRSensor CANNOT calculate distance (range and rangecm) without";
    str +=    " IR model number.\n";
    str +=    "Only analogRead() values will be available.\n";
    str +=    "To generate a distance range table, check ./node_modules";
    str +=    "/cylon-gpio/utilities/generate-ir-rage-sensor-table.js.\n";
    str +=    "Try passing model number as a device parameter.";
    Cylon.Logger.info(str);
  }

  this.analogVal = 0;
  this.distanceCm = 0;
  this.distanceIn = 0;

  if (this.pin == null) {
    throw new Error("No pin specified for IR Range Sensor. Cannot proceed");
  }

  this.commands = {
    analog_read: this.analogRead,
    range_cm: this.rangeCm,
    range: this.range
  };

  this.events = events;
};

Cylon.Utils.subclass(IrRangeSensor, Cylon.Driver);

/**
 * Starts the IR Range Sensor
 *
 * @param {Function} callback to be triggered when started
 * @return {null}
 */
IrRangeSensor.prototype.start = function(callback) {
  this.connection.analogRead(this.pin, function(err, readVal) {
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
 * @return {null}
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
 * @return {null}
 */
IrRangeSensor.prototype._calcDistances = function(analogVal) {
  var distance = 0,
      tmpRange = 0;

  for (var range in this.rangeTable.rangeDistances){
    tmpRange = parseInt(range);
    if ((analogVal <= tmpRange) && (analogVal + 5 > tmpRange)){
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
 * @return {Number} current analog value, or 0 if it's not been read yet
 * @publish
 */
IrRangeSensor.prototype.analogRead = function() {
  return this.analogVal || 0;
};

/**
 * Returns the current range, in centimeters
 *
 * @return {Number} current detected range in centimeters
 * @publish
 */
IrRangeSensor.prototype.rangeCm = function() {
  return this.distanceCm;
};

/**
 * Returns the current range, in inches
 *
 * @return {Number} current detected range in inches
 * @publish
 */
IrRangeSensor.prototype.range = function() {
  return this.distanceIn;
};
