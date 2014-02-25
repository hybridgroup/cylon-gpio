/*
 * Servo driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var namespace = require('node-namespace');

require('./cylon-gpio');

namespace("Cylon.Drivers.GPIO", function() {
  this.Servo = (function(_super) {
    subclass(Servo, _super);

    function Servo(opts) {
      if (opts == null) { opts = {}; }

      Servo.__super__.constructor.apply(this, arguments);

      this.pin = this.device.pin;
      this.angleValue = 0;
      this.angleRange = { min: 30, max: 150 };

      if ((opts.extraParams != null) && (opts.extraParams.range != null)) {
        this.angleRange = opts.extraParams.range;
      }
    }

    Servo.prototype.commands = function() {
      return ['angle', 'currentAngle'];
    };

    // Public: Returns the current angle of the servo, an integer value 
    // between 0 and 180.
    //
    // Returns an integer.
    Servo.prototype.currentAngle = function() {
      return this.angleValue;
    };

    // Public: Moves the servo to the specified angle, angle must be an 
    // integer value between 0 and 180.
    //
    // value - params
    //
    // Returns null.
    Servo.prototype.angle = function(value) {
      value = this.safeAngle(value);
      this.connection.servoWrite(this.pin, value);
      return this.angleValue = value;
    };

    // Public: Saves an specified angle, angle must be an 
    // integer value between 0 and 180.
    //
    // value - params
    //
    // Returns null.
    Servo.prototype.safeAngle = function(value) {
      if (value < this.angleRange.min || value > this.angleRange.max) {
        if (value < this.angleRange.min) {
          value = this.angleRange.min;
        } else {
          value = this.angleRange.max;
        }
      }
      return value;
    };

    return Servo;

  })(Cylon.Driver);
});

module.exports = Cylon.Drivers.GPIO.Servo;
