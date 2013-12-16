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
        var extraParams;
        if (opts == null) {
          opts = {};
        }
        Servo.__super__.constructor.apply(this, arguments);
        this.pin = this.device.pin;
        extraParams = opts.extraParams || {};
        this.type = extraParams.type || 'standard';
        this.angleValue = 0;
      }

      Servo.prototype.commands = function() {
        if (this.type === 'continuous') {
          return ['clockwise', 'counterClockwise', 'stop'];
        } else {
          return ['angle', 'currentAngle'];
        }
      };

      Servo.prototype.currentAngle = function() {
        return this.angleValue;
      };

      Servo.prototype.angle = function(value) {
        this.connection.servoWrite(this.pin, value);
        return this.angleValue = value;
      };

      Servo.prototype.stop = function() {
        if (this.type === 'continuous') {
          Logger.debug("Continuous Servo on pin " + this.pin + " stopping");
          return this.connection.servoWrite(this.pin, 90);
        }
      };

      Servo.prototype.clockwise = function() {
        if (this.type === 'continuous') {
          Logger.debug("Servo on pin " + this.pin + " turning clockwise");
          return this.connection.servoWrite(this.pin, 180);
        } else {
          return Logger.debug("Servo can't turn clockwise since it is not continuous");
        }
      };

      Servo.prototype.counterClockwise = function() {
        if (this.type === 'continuous') {
          Logger.debug("Servo on pin " + this.pin + " turning counter clockwise");
          return this.connection.servoWrite(this.pin, 89);
        } else {
          return Logger.debug("Servo can't turn counterclockwise since it is not continuous");
        }
      };

      return Servo;

    })(Cylon.Driver);
  });

}).call(this);
