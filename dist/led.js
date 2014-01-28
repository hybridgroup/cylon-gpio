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

      # Public: Turns LED on.
      #
      # Returns null
      Led.prototype.turnOn = function() {
        this.isOn = true;
        return this.connection.digitalWrite(this.pin, 1);
      };

      # Public: Turns LED off.
      #
      # Returns null.
      Led.prototype.turnOff = function() {
        this.isOn = false;
        return this.connection.digitalWrite(this.pin, 0);
      };

      # Public: Turns the LED on, or off, depending on if it is already off, or on, respectively.
      #
      # Returns null.
      Led.prototype.toggle = function() {
        if (this.isOn) {
          return this.turnOff();
        } else {
          return this.turnOn();
        }
      };

      # Public: Sets brightness of the led to the specified brightness value 
      # passed to brightness(brightness_int) using PWM, brightness can be any 
      # integer value between 0 and 255.
      #
      # value - params, The brightness level
      #
      # Returns null.
      Led.prototype.brightness = function(value) {
        return this.connection.pwmWrite(this.pin, value);
      };

      return Led;

    })(Cylon.Driver);
  });

}).call(this);
