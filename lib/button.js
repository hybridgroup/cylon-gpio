/*
 * Cylon button driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

var events = [
  /**
   * Emitted when the Button is pushed
   *
   * @event push
   */
  "push",

  /**
   * Emitted when the Button is released
   *
   * @event release
   */
  "release"
];

/**
 * A Button driver
 *
 * @constructor Button
 *
 * @param {Object} opts options object
 * @param {String|Number} opts.pin the pin to connect to
 */
var Button = module.exports = function Button() {
  Button.__super__.constructor.apply(this, arguments);

  this.pressed = false;
  this.prevState = 0;

  if (this.pin == null) {
    throw new Error("No pin specified for Button. Cannot proceed");
  }

  this.commands = {
    is_pressed: this.isPressed
  };

  this.events = events;
};

/** Subclasses the Cylon.Driver class */
Cylon.Utils.subclass(Button, Cylon.Driver);

/**
 * Check whether or not the Button is currently pressed
 *
 * @param {Function} [callback] invoked with `err, value` as args
 * @return {Boolean} whether or not the button is pressed
 * @publish
 */
Button.prototype.isPressed = function(callback) {
  if (typeof callback === "function") {
    callback(null, this.pressed);
  }

  return this.pressed;
};

/**
 * Starts the Button
 *
 * @param {Function} callback to be triggered when started
 * @return {void}
 * @private
 */
Button.prototype.start = function(callback) {
  this.connection.digitalRead(this.pin, function(err, data) {
    if (err) { return; }

    var previouslyPressed = this.pressed;
    this.pressed = (data === 1);

    if (this.pressed && !previouslyPressed) {
      this.pressed = true;
      this.emit("push");
    } else if (!this.pressed && previouslyPressed) {
      this.pressed = false;
      this.emit("release");
    }
  }.bind(this));

  callback();
};

/**
 * Stops the Analog Sensor
 *
 * @param {Function} callback to be triggered when stopped
 * @return {void}
 * @private
 */
Button.prototype.halt = function(callback) {
  callback();
};
