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
        this.angleValue = 0;
      }

      Servo.prototype.commands = function() {
        return ['angle', 'currentAngle'];
      };

      Servo.prototype.start = function(callback) {
        Logger.debug("Servo on pin " + this.pin + " started");
        return callback(null);
      };

      Servo.prototype.currentAngle = function() {
        return this.angleValue;
      };

      Servo.prototype.angle = function(value) {
        this.connection.servoWrite(this.pin, value);
        return this.angleValue = value;
      };

      return Servo;

    })();
  });

}).call(this);
