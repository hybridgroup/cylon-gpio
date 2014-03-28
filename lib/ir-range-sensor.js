/*
 * SHARP IR Range Sensor driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var namespace = require('node-namespace'),
    path = require('path');

require('./cylon-gpio');

namespace("Cylon.Drivers.GPIO", function() {
  this.IrRangeSensor = (function(klass) {
    subclass(IrRangeSensor, klass);

    function IrRangeSensor(opts) {
      IrRangeSensor.__super__.constructor.apply(this, arguments);

      var _this = this;

      if (opts.extraParams.model){
        this.rangeTable = require(path.join(__dirname, './ir_range_tables/' + opts.extraParams.model.toLowerCase() + '.js'));
        this.device.on('analogRead', function(readVal){
          _this.device.emit('range', _this.range());
          _this.device.emit('rangeCm', _this.rangecm());
        });
      }else{
        this.rangeTable = {};
        Logger.info("IRSensor CANNOT calculate distance (range and rangecm) without IR model number.")
        Logger.info("Try Passing model number as a device parameter.")
      }
    }

    IrRangeSensor.prototype.commands = function() {
      return ['analogRead', 'rangeCm', 'range'];
    };

    IrRangeSensor.prototype.analogRead = function() {
      return this.analogVal;
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
      return(this.rangecm() / 2.54);
    };

    return IrRangeSensor;

  })(Cylon.Drivers.GPIO.AnalogSensor);
});
