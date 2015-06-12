/*
 * Cylon Makey Button driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

var events = [
  /**
   * Emitted when the Makey Button is pushed
   *
   * @event push
   */
  "push",

  /**
   * Emitted when the Makey Button is released
   *
   * @event release
   */
  "release"
];

/**
 * A Makey Button driver
 *
 * @constructor MakeyButton
 *
 * @param {Object} opts options object
 * @param {String|Number} opts.pin the pin to connect to
 */
var MakeyButton = module.exports = function MakeyButton() {
  MakeyButton.__super__.constructor.apply(this, arguments);

  this.isPressed = false;
  this.currentValue = 0;
  this.data = [];

  if (this.pin == null) {
    throw new Error("No pin specified for Makey Button. Cannot proceed");
  }

  this.events = events;
};

/** Subclasses the Cylon.Driver class */
Cylon.Utils.subclass(MakeyButton, Cylon.Driver);

/**
 * Starts the Makey Button
 *
 * @param {Function} callback to be triggered when started
 * @return {void}
 */
MakeyButton.prototype.start = function(callback) {
  this.connection.digitalRead(this.pin, function(err, data) {
    if (err) { return; }
    this.currentValue = data;
  }.bind(this));

  Cylon.Utils.every(50, function() {
    this.data.push(this.currentValue);
    if (this.data.length > 5) {
      this.data.shift();
    }

    if (this.averageData() <= 0.5 && !this.isPressed) {
      this.isPressed = true;
      this.emit("push");
    } else if (this.averageData() > 0.5 && this.isPressed) {
      this.isPressed = false;
      this.emit("release");
    }
  }.bind(this));

  callback();
};

/**
 * Stops the Makey Button
 *
 * @param {Function} callback to be triggered when halted
 * @return {void}
 */
MakeyButton.prototype.halt = function(callback) {
  callback();
};

/**
 * Averages read digital values
 *
 * @return {Number} averaged value
 */
MakeyButton.prototype.averageData = function() {
  var result = 0;

  if (this.data.length > 0) {
    this.data.forEach(function(n) { result += n; });
    result = result / this.data.length;
  }

  return result;
};
