/*
 * Continuous Servo driver
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
    return this.ContinuousServo = (function(_super) {
      __extends(ContinuousServo, _super);

      function ContinuousServo(opts) {
        if (opts == null) {
          opts = {};
        }
        ContinuousServo.__super__.constructor.apply(this, arguments);
        this.pin = this.device.pin;
        this.angleValue = 0;
      }

      ContinuousServo.prototype.commands = function() {
        return ['clockwise', 'counterClockwise', 'stop'];
      };

      ContinuousServo.prototype.stop = function() {
        return this.connection.servoWrite(this.pin, 90);
      };

      ContinuousServo.prototype.clockwise = function() {
        Logger.debug("Servo on pin " + this.pin + " turning clockwise");
        return this.connection.servoWrite(this.pin, 180);
      };

      ContinuousServo.prototype.counterClockwise = function() {
        Logger.debug("Servo on pin " + this.pin + " turning counter clockwise");
        return this.connection.servoWrite(this.pin, 89);
      };

      return ContinuousServo;

    })(Cylon.Driver);
  });

}).call(this);
