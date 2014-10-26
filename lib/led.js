/*
 * LED driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

var Led = module.exports = function(opts) {
  opts = opts || {};
  opts.extraParams = opts.extraParams || {};
  var led = Cylon.Driver(opts);
  console.log(led);

  // private variables and methods
  var pin = opts.pin;
  var freq = opts.extraParams.freq || null;
  var isHigh = false;
  var brightnessValue = 0;
  var pwmScale = opts.extraParams.pwmScale || { bottom: 0, top: 255 };


  // public methods
  /*
  led.commands = {
    is_on: this.isOn,

    turn_on: this.turnOn,
    turn_off: this.turnOff,
    toggle: this.toggle,

    brightness: this.brightness,
    current_brightness: this.currentBrightness
  };
  */

  led.start = function(callback) {
    callback();
  };

  led.halt = function(callback) {
    callback();
  };

  // Public: Turns LED on.
  //
  // Returns null.
  led.turnOn = function() {
    isHigh = true;
    led.connection.digitalWrite(pin, 1);
  };

  // Public: Turns LED off.
  //
  // Returns null.
  led.turnOff = function() {
    isHigh = false;
    led.connection.digitalWrite(pin, 0);
  };

  // Public: Turns the LED on, or off, depending on if it is already off, or
  // on, respectively.
  //
  // Returns null.
  led.toggle = function() {
    if (isHigh) {
      led.turnOff();
    } else {
      led.turnOn();
    }
  };

  led.currentBrightness = function() {
    return led.brightnessValue;
  };

  // Public: Sets brightness of the led to the specified brightness value
  // passed to brightness(brightness_int) using PWM, brightness can be any
  // integer value between 0 and 255.
  //
  // value - params, The brightness level
  //
  // Returns null.
  led.brightness = function(value) {
    var scaledDuty = (value).fromScale(pwmScale.bottom, pwmScale.top);

    led.connection.pwmWrite(pin, scaledDuty, freq);
    brightnessValue = value;
  };

  led.isOn = function(){
    return isHigh;
  };

  return led;
};

