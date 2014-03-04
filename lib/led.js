/*
 * LED driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";
var namespace = require('node-namespace');

require('./cylon-gpio');

namespace("Cylon.Drivers.GPIO", function() {
  this.Led = (function(klass) {
    subclass(Led, klass);

    function Led(opts) {
      Led.__super__.constructor.apply(this, arguments);

      this.pin = this.device.pin;
      this.isOn = false;
    }

    Led.prototype.commands = function() {
      return ['isItOn', 'turnOn', 'turnOff', 'toggle', 'brightness'];
    };

    // Public: Turns LED on.
    //
    // Returns null.
    Led.prototype.turnOn = function() {
      this.isOn = true;
      return this.connection.digitalWrite(this.pin, 1);
    };

    // Public: Turns LED off.
    //
    // Returns null.
    Led.prototype.turnOff = function() {
      this.isOn = false;
      return this.connection.digitalWrite(this.pin, 0);
    };

    // Public: Turns the LED on, or off, depending on if it is already off, or
    // on, respectively.
    //
    // Returns null.
    Led.prototype.toggle = function() {
      return this.isOn ? this.turnOff() : this.turnOn();
    };

    // Public: Sets brightness of the led to the specified brightness value
    // passed to brightness(brightness_int) using PWM, brightness can be any
    // integer value between 0 and 255.
    //
    // value - params, The brightness level
    //
    // Returns null.
    Led.prototype.brightness = function(value) {
      return this.connection.pwmWrite(this.pin, value);
    };

    Led.prototype.isItOn = function(){
      return this.isOn;
    }

    return Led;

  })(Cylon.Driver);
});

module.exports = Cylon.Drivers.GPIO.Led;
