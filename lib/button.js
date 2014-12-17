/*
 * Cylon button driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require('cylon');

/**
 * A Button driver
 *
 * @constructor
 *
 * @param {Object} opts options for the Button
 * @property {Boolean} pressed Whether or not the button is currently pressed
 * @property {Number} prevState The previous value of the button
 */
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

/** Subclasses the Cylon.Driver class */
Cylon.Utils.subclass(Button, Cylon.Driver);

/**
 * Check whether or not the Button is currently pressed
 *
 * @return {Boolean} whether or not the button is pressed
 * @publish
 */
Button.prototype.isPressed = function() {
  return this.pressed;
};

/**
 * Starts the Button
 *
 * @param {Function} callback to be triggered when started
 * @return {null}
 * @private
 */
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

/**
 * Stops the Analog Sensor
 *
 * @param {Function} callback to be triggered when stopped
 * @return {null}
 * @private
 */
Button.prototype.halt = function(callback) {
  callback();
};
