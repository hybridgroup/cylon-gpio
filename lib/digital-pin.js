/*
 * DigitalPin driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var namespace = require('node-namespace');

require('./cylon-gpio');

namespace("Cylon.Drivers.GPIO", function() {
  this.DigitalPin = (function(parent) {
    subclass(DigitalPin, parent);

    function DigitalPin(opts) {
       DigitalPin.__super__.constructor.apply(this, arguments);

      this.pin = this.device.pin;
      this.high = false;
    }

    DigitalPin.prototype.commands = function() {
      return ['isHigh', 'isLow', 'setHigh', 'setLow', 'toggle'];
    };

    // Public: Set Pin High.
    //
    // Returns null.
    DigitalPin.prototype.setHigh = function() {
      this.high = true;
      this.connection.digitalWrite(this.pin, 1);
    };

    // Public: Set Pin Low.
    //
    // Returns null.
    DigitalPin.prototype.setLow = function() {
      this.high = false;
      return this.connection.digitalWrite(this.pin, 0);
    };

    // Public: Turns the pin High, or Off, depending on if it is previous state.
    //
    // Returns null.
    DigitalPin.prototype.toggle = function() {
      return this.high ? this.setLow() : this.setLow();
    };

    DigitalPin.prototype.isHigh = function(){
      return this.high;
    }

    DigitalPin.prototype.isLow = function(){
      return !this.high;
    }

    return DigitalPin;

  })(Cylon.Driver);
});

module.exports = Cylon.Drivers.GPIO.DigitalPin;
