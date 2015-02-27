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
  var models = ["lv", "xl", "xl-long", "hr", "hr-long"],
      distance = this.rangeCm();

  if (models.indexOf(this.model) > -1) {
     distance = distance * 0.3937;
  }

  return distance;
};

/**
 * Gets the distance measured by the sonar, in centimeters.
 *
 * @return {Number} the current measured distance, in centimeters
 * @publish
 */
Maxbotix.prototype.rangeCm = function() {
  var distance;

  switch(this.model){
    case "lv":
      distance = (this.analogValue / 2.0) / 0.3937;
      break;
    case "xl-long":
      distance = this.analogValue * 2.0;
      break;
    case "hr":
      distance = this.analogValue * 0.5;
      break;
    case "xl":
    case "hr-long":
      distance = this.analogValue;
      break;
    default:
      distance = this.analogValue; // raw data, in case of unknown model
  }

  return distance;
};
