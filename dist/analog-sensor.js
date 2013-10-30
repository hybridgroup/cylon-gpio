/*
 * Analog Sensor driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var namespace;

  namespace = require('node-namespace');

  namespace("Cylon.Driver.GPIO", function() {
    return this.AnalogSensor = (function() {
      function AnalogSensor(opts) {
        console.log('AnalogSensor driver opts =>');
        console.log(opts);
        this.self = this;
        this.device = opts.device;
        this.connection = this.device.connection;
        this.pin = this.device.pin;
        this.upperLimit = opts.extraParams.upperLimit;
        this.lowerLimit = opts.extraParams.lowerLimit;
        this.analog_val = null;
      }

      AnalogSensor.prototype.commands = function() {
        return ['analogRead'];
      };

      AnalogSensor.prototype.start = function(callback) {
        var _this = this;
        Logger.debug("AnalogSensor on pin " + this.pin + " started");
        this.connection.analogRead(this.pin, function(readVal) {
          _this.analogVal = readVal;
          if (readVal >= _this.upperLimit) {
            _this.device.emit('upperLimit', readVal);
          } else if (readVal <= _this.lowerLimit) {
            _this.device.emit('lowerLimit', readVal);
          }
          return _this.device.emit('analogRead', readVal);
        });
        return callback(null);
      };

      return AnalogSensor;

    })();
  });

}).call(this);
