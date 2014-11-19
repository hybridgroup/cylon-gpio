/*
 * Cylon button driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require('cylon');

var Button = module.exports = function Button(opts) {
  Button.__super__.constructor.apply(this, arguments);

  this.pressed = false;
  this.prevState = 0;

  if (this.pin == null) {
    throw new Error("No pin specified for Button. Cannot proceed")
  }

  this.commands = {
    is_pressed: this.isPressed
  };
};

Cylon.Utils.subclass(Button, Cylon.Driver);

Button.prototype.isPressed = function() {
  return this.pressed;
};

// Public: Starts the driver
//
// callback - params
//
// Returns null.
Button.prototype.start = function(callback) {
  this.connection.digitalRead(this.pin, function(err, data) {
    var event = (data === 1) ? 'press' : 'release';

    if (data === 0) {
      if (this.prevState === 1) {
        this.emit('push');
      }
    }

    this.prevState = data;
    this.pressed = (data === 1);

    this.emit(event);
  }.bind(this));

  callback();
};

Button.prototype.halt = function(callback) {
  callback();
};
