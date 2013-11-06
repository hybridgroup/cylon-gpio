/*
 * LED driver
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
    return this.Led = (function() {
      function Led(opts) {
        this.self = this;
        this.device = opts.device;
        this.connection = this.device.connection;
        this.pin = this.device.pin;
        this.isOn = false;
      }

      Led.prototype.commands = function() {
        return ['turnOn', 'turnOff', 'toggle', 'brightness'];
      };

      Led.prototype.start = function(callback) {
        Logger.debug("LED on pin " + this.pin + " started");
        callback(null);
        return this.device.emit('start');
      };

      Led.prototype.stop = function() {
        return Logger.debug("LED on pin " + this.pin + " stopping");
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

    })();
  });

}).call(this);
