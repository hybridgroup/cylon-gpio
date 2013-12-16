/*
 * Cylon button driver
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
    return this.Button = (function(_super) {
      __extends(Button, _super);

      function Button(opts) {
        Button.__super__.constructor.apply(this, arguments);
        this.pin = this.device.pin;
        this.isPressed = false;
      }

      Button.prototype.commands = function() {
        return ['isPressed'];
      };

      Button.prototype.start = function(callback) {
        var _this = this;
        this.connection.digitalRead(this.pin, function(data) {
          if (data === 1) {
            _this.isPressed = true;
            return _this.device.emit('push');
          } else {
            _this.isPressed = false;
            return _this.device.emit('release');
          }
        });
        return Button.__super__.start.apply(this, arguments);
      };

      return Button;

    })(Cylon.Driver);
  });

}).call(this);
