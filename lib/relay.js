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
 * @param {Object} opts
 * @param {String|Number} opts.pin the pin to connect to
 * @param {String} opts.type
 */
var Relay = module.exports = function Relay(opts) {
  Relay.__super__.constructor.apply(this, arguments);

  this.type = opts.type || "NO";

  this.state = {
    isInverted: opts.type === "NC",
    isOn: false
  };

  if (this.pin == null) {
    throw new Error("No pin specified for Relay. Cannot proceed");
  }

  this.commands = {
    turn_on: this.turnOn,
    turn_off: this.turnOff,
    toggle: this.toggle
  };

  Object.defineProperties(this, {
    type: {
      get: function() {
        return this.state.isInverted ? "NC" : "NO";
      }
    },
    isOn: {
      get: function() {
        return this.state.isOn;
      }
    }
  });
};

/** Subclasses the Cylon.Driver class */
Cylon.Utils.subclass(Relay, Cylon.Driver);

/**
 * Starts the Relay
 *
 * @param {Function} callback to be triggered when started
 * @return {null}
 */
Relay.prototype.start = function(callback) {
  callback();
};

/**
 * Stops the Relay
 *
 * @param {Function} callback to be triggered when halted
 * @return {null}
 */
Relay.prototype.halt = function(callback) {
  callback();
};

/**
 * Writes a HIGH (1) value to the pin, turning the Relay on.
 *
 * Also sets `this.isOn` to `true`.
 *
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {null}
 * @publish
 */
Relay.prototype.turnOn = function(callback) {
  var state = this.state;

  this.connection.digitalWrite(
    this.pin, state.isInverted ? 0 : 1, callback);
  state.isOn = true;
};

/**
 * Writes a LOW (0) value to the pin, turning the Relay off.
 *
 * Also sets `this.isOn` to `false`.
 *
 * @param {Function} [callback] - (err, val) triggers when write is complete
 * @return {null}
 * @publish
 */
Relay.prototype.turnOff = function(callback) {
  var state = this.state;

  this.connection.digitalWrite(
    this.pin, state.isInverted ? 1 : 0, callback);
  state.isOn = false;
};

/**
 * Toggles the Relay on or off, depending on its current state
 *
 * @return {null}
 * @publish
 */
Relay.prototype.toggle = function(callback) {
  var state = this.state;

  if (state.isOn) {
    this.turnOff();
  } else {
    this.turnOn();
  }

  if (typeof callback === "function") {
    callback();
  }
};
