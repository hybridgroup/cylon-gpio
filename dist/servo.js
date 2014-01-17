/*
 * Servo driver
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
    return this.Servo = (function(_super) {
      __extends(Servo, _super);

      function Servo(opts) {
        if (opts == null) {
          opts = {};
        }
        Servo.__super__.constructor.apply(this, arguments);
        this.pin = this.device.pin;
        this.angleValue = 0;
        this.safetyLock = true;
      }

      Servo.prototype.commands = function() {
        return ['angle', 'currentAngle', 'unlockAngleSafety'];
      };

      Servo.prototype.currentAngle = function() {
        return this.angleValue;
      };

      Servo.prototype.angle = function(value) {
        if (this.safetyLock) {
          value = this.angleSafety(value);
        }
        this.connection.servoWrite(this.pin, value);
        return this.angleValue = value;
      };

      Servo.prototype.angleSafety = function(value) {
        if (value < 30 || value > 150) {
          if (value < 30) {
            value = 30;
          } else {
            value = 150;
          }
        }
        return value;
      };

      Servo.prototype.unlockAngleSafety = function() {
        return this.safetyLock = false;
      };

      return Servo;

    })(Cylon.Driver);
  });

}).call(this);
