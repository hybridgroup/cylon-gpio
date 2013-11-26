/*
 * Maxbotix ultrasonic rangefinder driver
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
    return this.Maxbotix = (function() {
      function Maxbotix(opts) {
        this.self = this;
        this.device = opts.device;
        this.connection = this.device.connection;
        this.pin = this.device.pin;
        this.analogValue = 0;
      }

      Maxbotix.prototype.commands = function() {
        return ['analogValue', 'range', 'rangeCm'];
      };

      Maxbotix.prototype.start = function(callback) {
        var _this = this;
        Logger.debug("Maxbotix on pin " + this.pin + " started");
        this.connection.analogRead(this.pin, function(readVal) {
          _this.self.analogValue = readVal;
          _this.device.emit('range', _this.self.range());
          return _this.device.emit('rangeCm', _this.self.rangeCm());
        });
        callback(null);
        return this.device.emit('start');
      };

      Maxbotix.prototype.stop = function() {
        return Logger.debug("Maxbotix on pin " + this.pin + " stopping");
      };

      Maxbotix.prototype.range = function() {
        return (254.0 / 1024.0) * 2.0 * this.analogValue;
      };

      Maxbotix.prototype.rangeCm = function() {
        return (this.analogValue / 2.0) * 2.54;
      };

      return Maxbotix;

    })();
  });

}).call(this);
