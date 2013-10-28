/*
 * Cylon button driver
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
    return this.Button = (function() {
      function Button(opts) {
        this.self = this;
        this.device = opts.device;
        this.connection = this.device.connection;
        this.pin = this.device.pin;
        this.isPressed = false;
      }

      Button.prototype.commands = function() {
        return ['isPressed'];
      };

      Button.prototype.start = function(callback) {
        var _this = this;
        Logger.debug("Button on pin " + this.pin + " started");
        this.connection.digitalRead(this.pin, function(data) {
          if (data === 1) {
            _this.isPressed = true;
            return _this.device.emit('pushed');
          } else {
            _this.isPressed = false;
            return _this.device.emit('released');
          }
        });
        return callback(null);
      };

      return Button;

    })();
  });

}).call(this);
