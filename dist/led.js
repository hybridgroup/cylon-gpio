/*
 * LED driver
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
    return this.Led = (function(_super) {
      __extends(Led, _super);

      function Led(opts) {
        Led.__super__.constructor.apply(this, arguments);
        this.pin = this.device.pin;
        this.isOn = false;
      }

      Led.prototype.commands = function() {
        return ['turnOn', 'turnOff', 'toggle', 'brightness'];
      };

      Led.prototype.turnOn = function() {
        this.isOn = true;
        return this.connection.digitalWrite(this.pin, 1);
      };

      Led.prototype.turnOff = function() {
        this.isOn = false;
        return this.connection.digitalWrite(this.pin, 0);
      };

      Led.prototype.toggle = function() {
        if (this.isOn) {
          return this.turnOff();
        } else {
          return this.turnOn();
        }
      };

      Led.prototype.brightness = function(value) {
        return this.connection.pwmWrite(this.pin, value);
      };

      return Led;

    })(Cylon.Driver);
  });

}).call(this);
