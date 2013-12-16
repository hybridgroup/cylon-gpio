/*
 * Analog Sensor driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var namespace,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require('./cylon-gpio');

  namespace = require('node-namespace');

  namespace("Cylon.Drivers.GPIO", function() {
    return this.AnalogSensor = (function(_super) {
      __extends(AnalogSensor, _super);

      function AnalogSensor(opts) {
        var extraParams;
        AnalogSensor.__super__.constructor.apply(this, arguments);
        this.pin = this.device.pin;
        extraParams = opts.extraParams || {};
        this.upperLimit = extraParams.upperLimit || 256;
        this.lowerLimit = extraParams.lowerLimit || 0;
        this.analog_val = null;
      }

      AnalogSensor.prototype.commands = function() {
        return ['analogRead'];
      };

      AnalogSensor.prototype.start = function(callback) {
        var _this = this;
        this.connection.analogRead(this.pin, function(readVal) {
          _this.analogVal = readVal;
          _this.device.emit('analogRead', readVal);
          if (readVal >= _this.upperLimit) {
            return _this.device.emit('upperLimit', readVal);
          } else if (readVal <= _this.lowerLimit) {
            return _this.device.emit('lowerLimit', readVal);
          }
        });
        return AnalogSensor.__super__.start.apply(this, arguments);
      };

      return AnalogSensor;

    })(Cylon.Driver);
  });

}).call(this);
