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
        this.current_speed = false;
        this.isOn;
      }

      Motor.prototype.commands = function() {
        return ['turnOn', 'turnOff', 'toggle', 'speed'];
      };

      Motor.prototype.start = function(callback) {
        Logger.debug("Motor on pin " + this.pin + " started");
        return callback(null);
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

      Motor.prototype.speed = function(value) {
        console.log("speed -> " + value);
        this.connection.pwmWrite(this.pin, value);
        return this.current_speed = value;
      };

      return Motor;

    })();
  });

}).call(this);
