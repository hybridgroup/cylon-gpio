/*
 * SHARP IR Range Sensor driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var path = require('path');
var Cylon = require('cylon');

var IrRangeSensor = module.exports = function IrRangeSensor(opts) {
  IrRangeSensor.__super__.constructor.apply(this, arguments);

  if (opts.extraParams.model) {
    this.rangeTable = require(path.join(__dirname, './ir_range_tables/' + opts.extraParams.model.toLowerCase() + '.js'));
  } else {
    this.rangeTable = {};
    Cylon.Logger.info("IRSensor CANNOT calculate distance (range and rangecm) without IR model number.")
    Cylon.Logger.info("Try Passing model number as a device parameter.")
  }

  this.analogVal = 0;

  this.commands = {
    analog_read: this.analogRead,
    range_cm: this.rangeCm,
    range: this.range
  }
}

Cylon.Utils.subclass(IrRangeSensor, Cylon.Driver);

// Public: Starts the driver
//
// Returns null.
IrRangeSensor.prototype.start = function(callback) {
  Cylon.Logger.debug("IrRangeSensor on pin " + this.device.pin + " started");

  this.device.connection.analogRead(this.device.pin, function(readVal) {
    this.analogVal = readVal;
    this.device.emit('range', this.range());
    this.device.emit('rangeCm', this.rangeCm());
  }.bind(this));

  return IrRangeSensor.__super__.start.apply(this, arguments);
};

IrRangeSensor.prototype.analogRead = function() {
  return this.analogVal || 0;
};

IrRangeSensor.prototype.rangeCm = function() {
  var dist = 0,
      tmpRange = 0;

  for (var range in this.rangeTable.rangeDistances){
    tmpRange = parseInt(range);
    if ((this.analogVal <= tmpRange) && (this.analogVal + 5 > tmpRange)){
      dist = this.rangeTable.rangeDistances[range].dist;
      break;
    }
  }

  return dist;
};

IrRangeSensor.prototype.range = function() {
  return(this.rangeCm() / 2.54);
};
