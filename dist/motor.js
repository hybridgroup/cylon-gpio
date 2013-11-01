/*
 * Motor driver
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
    return this.Motor = (function() {
      function Motor(opts) {
        this.self = this;
        this.device = opts.device;
        this.connection = this.device.connection;
        this.pin = this.device.pin;
        this.speedValue = 0;
        this.isOn = false;
      }

      Motor.prototype.commands = function() {
        return ['turnOn', 'turnOff', 'toggle', 'speed', 'currentSpeed'];
      };

      Motor.prototype.start = function(callback) {
        Logger.debug("Motor on pin " + this.pin + " started");
        callback(null);
        return this.device.emit('start');
      };

      Motor.prototype.turnOn = function() {
        this.isOn = true;
        return this.connection.digitalWrite(this.pin, 1);
      };

      Motor.prototype.turnOff = function() {
        this.isOn = false;
        return this.connection.digitalWrite(this.pin, 0);
      };

      Motor.prototype.toggle = function() {
        if (this.isOn) {
          return this.turnOff();
        } else {
          return this.turnOn();
        }
      };

      Motor.prototype.currentSpeed = function() {
        return this.speedValue;
      };

      Motor.prototype.speed = function(value) {
        this.connection.pwmWrite(this.pin, value);
        this.speedValue = value;
        return this.isOn = this.currentSpeed > 0;
      };

      return Motor;

    })();
  });

}).call(this);
