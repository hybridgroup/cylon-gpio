/*
 * Maxbotix ultrasonic rangefinder driver
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

  namespace = require('node-namespace');

  require('./cylon-gpio');

  namespace("Cylon.Drivers.GPIO", function() {
    return this.Maxbotix = (function(_super) {
      __extends(Maxbotix, _super);

      function Maxbotix(opts) {
        Maxbotix.__super__.constructor.apply(this, arguments);
        this.pin = this.device.pin;
        this.analogValue = 0;
      }

      Maxbotix.prototype.commands = function() {
        return ['analogValue', 'range', 'rangeCm'];
      };

      Maxbotix.prototype.start = function(callback) {
        var _this = this;
        Logger.debug("Maxbotix on pin " + this.pin + " started");
        this.device.connection.analogRead(this.pin, function(readVal) {
          _this.self.analogValue = readVal;
          _this.device.emit('range', _this.self.range());
          return _this.device.emit('rangeCm', _this.self.rangeCm());
        });
        return Maxbotix.__super__.start.apply(this, arguments);
      };

      Maxbotix.prototype.range = function() {
        return (254.0 / 1024.0) * 2.0 * this.analogValue;
      };

      Maxbotix.prototype.rangeCm = function() {
        return (this.analogValue / 2.0) * 2.54;
      };

      return Maxbotix;

    })(Cylon.Driver);
  });

}).call(this);
