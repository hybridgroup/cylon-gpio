/*
 * Servo driver
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
    return this.Servo = (function() {
      function Servo(opts) {
        this.self = this;
        this.device = opts.device;
        this.connection = this.device.connection;
        this.pin = this.device.pin;
        this.type = opts.type || 'standard';
        this.angleValue = 0;
      }

      Servo.prototype.commands = function() {
        var cmds;
        cmds = ['angle', 'currentAngle'];
        if (this.type === 'continuous') {
          cmds += ['clockwise', 'counterClockwise', 'stop'];
        }
        return cmds;
      };

      Servo.prototype.start = function(callback) {
        Logger.debug("Servo on pin " + this.pin + " started");
        callback(null);
        return this.device.emit('start');
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
          Logger.debug("Servo on pin " + this.pin + " stopping");
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
          return this.connection.servoWrite(this.pin, 0);
        } else {
          return Logger.debug("Servo can't turn counterclockwise since it is not continuous");
        }
      };

      return Servo;

    })();
  });

}).call(this);
