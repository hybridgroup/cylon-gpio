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
    return this.MakeyButton = (function(_super) {
      __extends(MakeyButton, _super);

      function MakeyButton(opts) {
        MakeyButton.__super__.constructor.apply(this, arguments);
        this.pin = this.device.pin;
        this.isPressed = false;
        this.data = [];
      }

      MakeyButton.prototype.commands = function() {
        return ['isPressed'];
      };

      MakeyButton.prototype.start = function(callback) {
        var _this = this;
        this.connection.digitalRead(this.pin, function(data) {
          _this.data.push(data);
          return _this.data.shift;
        });
        every(100, function() {
          if (_this.averageData() > 0.5 && !_this.isPressed) {
            _this.isPressed = true;
            return _this.device.emit('push');
          } else if (_this.averageData() <= 0.5 && _this.isPressed) {
            _this.isPressed = false;
            return _this.device.emit('release');
          }
        });
        return MakeyButton.__super__.start.apply(this, arguments);
      };

      MakeyButton.prototype.averageData = function() {
        var result;
        result = 0;
        if (this.data.length > 0) {
          this.data.forEach(function(n) {
            return result += n;
          });
          result = result / this.data.length;
        }
        return result;
      };

      return MakeyButton;

    })(Cylon.Driver);
  });

}).call(this);
