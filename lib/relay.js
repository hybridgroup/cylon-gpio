/*
 * Relay driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2015 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

/**
 * A Relay driver
 *
 * @constructor relay
 *
 * @param {Object} opts options object
 * @param {String|Number} opts.pin the pin to connect to
 * @param {String} opts.type either "open" or "closed"
 */
var Relay = module.exports = function Relay(opts) {
  Relay.__super__.constructor.apply(this, arguments);

  this.type = opts.type || "open";
  this.isOn = false;

  if (this.pin == null) {
    throw new Error("No pin specified for Relay. Cannot proceed");
  }

  this.commands = {
    turn_on: this.turnOn,
    turn_off: this.turnOff,
    toggle: this.toggle
  };
};

/** Subclasses the Cylon.Driver class */
Cylon.Utils.subclass(Relay, Cylon.Driver);

/**
 * Starts the Relay
 *
 * @param {Function} callback to be triggered when started
 * @return {void}
 */
Relay.prototype.start = function(callback) {
  callback();
};

/**
 * Stops the Relay
 *
 * @param {Function} callback to be triggered when halted
 * @return {void}
 */
Relay.prototype.halt = function(callback) {
  callback();
};

/**
 * Turn the Relay on.
 *
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
Relay.prototype.turnOn = function(callback) {
  var newValue;
  if (this.type === "open") {
    newValue = 1;
  } else {
    newValue = 0;
  }

  this.connection.digitalWrite(this.pin, newValue, callback);
  this.isOn = true;
};

/**
 * Turn the Relay off.
 *
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {void}
 * @publish
 */
Relay.prototype.turnOff = function(callback) {
  var newValue;
  if (this.type === "open") {
    newValue = 0;
  } else {
    newValue = 1;
  }

  this.connection.digitalWrite(this.pin, newValue, callback);
  this.isOn = false;
};

/**
 * Toggles the Relay on or off, depending on its current state
 *
 * @param {Function} callback function to be invoked when done
 * @return {void}
 * @publish
 */
Relay.prototype.toggle = function(callback) {
  if (this.isOn) {
    this.turnOff();
  } else {
    this.turnOn();
  }

  if (typeof callback === "function") {
    callback();
  }
};
