/*
 * Maxbotix ultrasonic rangefinder driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

var events = [
  /**
   * Emitted when the Maxbotix has detected the current range
   *
   * @event range
   * @value distance the current distance in inches
   */
  "range",

  /**
   * Emitted when the Maxbotix has detected the current range
   *
   * @event rangeCm
   * @value distance the current distance in centimeters
   */
  "rangeCm",
];

/**
 * A Maxbotix driver
 *
 * @constructor maxbotix
 *
 * @param {Object} opts
 * @param {String|Number} opts.pin the pin to connect to
 */
var Maxbotix = module.exports = function Maxbotix(opts) {
  Maxbotix.__super__.constructor.apply(this, arguments);

  this.analogValue = 0;
  this.model = opts.model || "lv";

  if (this.pin == null) {
    throw new Error("No pin specified for Maxbotix. Cannot proceed");
  }

  this.commands = {
    range: this.range,
    rangeCm: this.rangeCm
  };

  this.events = events;
};

/** Subclasses the Cylon.Driver class */
Cylon.Utils.subclass(Maxbotix, Cylon.Driver);

/**
 * Starts the Maxbotix
 *
 * @param {Function} callback to be triggered when started
 * @return {null}
 */
Maxbotix.prototype.start = function(callback) {
  Cylon.Logger.debug("Maxbotix on pin " + this.pin + " started");

  this.connection.analogRead(this.pin, function(err, readVal) {
    this.analogValue = readVal;
    this.emit("range", this.range());
    this.emit("rangeCm", this.rangeCm());
  }.bind(this));

  callback();
};

/**
 * Stops the Maxbotix
 *
 * @param {Function} callback to be triggered when halted
 * @return {null}
 */
Maxbotix.prototype.halt = function(callback) {
  callback();
};

/**
 * Gets the distance measured by the sonar, in inches.
 *
 * @return {Number} the current measured distance, in inches
 * @publish
 */
Maxbotix.prototype.range = function() {
  if (this.model === "lv") {
    return this.analogValue / 2.0;
  } else if (this.model === "xl") {
    return this.rangeCm() * 0.3937;
  } else if (this.model === "xl-long") {
    return this.rangeCm() * 0.3937;
  } else if (this.model === "hr") {
    return this.rangeCm() * 0.3937;
  } else if (this.model === "hr-long") {
    return this.rangeCm() * 0.3937;
  } else {
    return this.analogValue; // raw data, in case of unknown model
  }

  return (254.0 / 1024.0) * 2.0 * this.analogValue;
};

/**
 * Gets the distance measured by the sonar, in centimeters.
 *
 * @return {Number} the current measured distance, in centimeters
 * @publish
 */
Maxbotix.prototype.rangeCm = function() {
  if (this.model === "lv") {
    return this.range() / 0.3937;
  } else if (this.model === "xl") {
    return this.analogValue;
  } else if (this.model === "xl-long") {
    return this.analogValue * 2.0;
  } else if (this.model === "hr") {
    return this.analogValue * 0.5;
  } else if (this.model === "hr-long") {
    return this.analogValue;
  } else {
    return this.analogValue; // raw data, in case of unknown model
  }

  return (this.analogValue / 2.0) * 2.54;
};
