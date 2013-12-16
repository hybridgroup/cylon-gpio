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

  namespace = require('node-namespace');

  require('./cylon-gpio');

  namespace("Cylon.Drivers.GPIO", function() {
    return this.Servo = (function(_super) {
      __extends(Servo, _super);

      function Servo(opts) {
        Servo.__super__.constructor.apply(this, arguments);
        this.pin = this.device.pin;
        this.angleValue = 0;
      }

      Servo.prototype.commands = function() {
        return ['angle', 'currentAngle'];
      };

      Servo.prototype.start = function(callback) {
        Logger.debug("Servo on pin " + this.pin + " started");
        return Servo.__super__.start.apply(this, arguments);
      };

      Servo.prototype.stop = function() {
        Logger.debug("Servo on pin " + this.pin + " stopping");
        return Servo.__super__.stop.apply(this, arguments);
      };

      Servo.prototype.currentAngle = function() {
        return this.angleValue;
      };

      Servo.prototype.angle = function(value) {
        this.connection.servoWrite(this.pin, value);
        return this.angleValue = value;
      };

      return Servo;

    })(Cylon.Drivers.Driver);
  });

}).call(this);
