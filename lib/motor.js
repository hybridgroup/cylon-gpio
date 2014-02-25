/*
 * Motor driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var namespace = require('node-namespace');

require('./cylon-gpio');

namespace("Cylon.Drivers.GPIO", function() {
  this.Motor = (function(klass) {
    subclass(Motor, klass);

    function Motor(opts) {
      Motor.__super__.constructor.apply(this, arguments);

      this.pin = this.device.pin;
      this.speedValue = 0;
      this.isOn = false;
    }

    Motor.prototype.commands = function() {
      return ['turnOn', 'turnOff', 'toggle', 'speed', 'currentSpeed'];
    };

    // Public: Starts the motor.
    //
    // Returns nil.
    Motor.prototype.turnOn = function() {
      this.isOn = true;
      return this.connection.digitalWrite(this.pin, 1);
    };

    // Public: Stops the motor.
    //
    // Returns nil.
    Motor.prototype.turnOff = function() {
      this.isOn = false;
      return this.connection.digitalWrite(this.pin, 0);
    };

    // Public: Sets the state of the motor to the oposite of the current state,
    // if motor is on then sets it to off.
    //
    // Returns true | nil.
    Motor.prototype.toggle = function() {
      return this.isOn ? this.turnOff() : this.turnOn();
    };

    // Public: Returns the current speed of the motor as an integer between 0 and 255.
    //
    // Returns integer.
    Motor.prototype.currentSpeed = function() {
      return this.speedValue;
    };

    // Public: Sets the speed of the motor to the value provided in the
    // speed param, speed value must be an integer between 0 and 255.
    //
    // value- params
    //
    // Returns integer.
    Motor.prototype.speed = function(value) {
      this.connection.pwmWrite(this.pin, value);
      this.speedValue = value;
      return this.isOn = this.speedValue > 0;
    };

    return Motor;

  })(Cylon.Driver);
});

module.exports = Cylon.Drivers.GPIO.Motor;
