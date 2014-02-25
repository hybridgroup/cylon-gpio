/*
 * Cylon button driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var namespace = require('node-namespace');

require('./cylon-gpio');

namespace("Cylon.Drivers.GPIO", function() {
  this.Button = (function(klass) {
    subclass(Button, klass);

    function Button(opts) {
      Button.__super__.constructor.apply(this, arguments);

      this.pin = this.device.pin;
      this.isPressed = false;
    }

    Button.prototype.commands = function() {
      return ['isPressed'];
    };

    // Public: Starts the driver
    //
    // callback - params
    //
    // Returns null.
    Button.prototype.start = function(callback) {
      var self = this;

      this.connection.digitalRead(this.pin, function(data) {
        if (data === 1) {
          self.isPressed = true;
          return self.device.emit('push');
        } else {
          self.isPressed = false;
          return self.device.emit('release');
        }
      });

      return Button.__super__.start.apply(this, arguments);
    };

    return Button;

  })(Cylon.Driver);
});

module.exports = Cylon.Drivers.GPIO.Button;
