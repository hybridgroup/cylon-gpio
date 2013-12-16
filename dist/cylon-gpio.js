/*
 * cylon-gpio
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var namespace;

  namespace = require('node-namespace');

  require('cylon');

  require('./maxbotix');

  module.exports = {
    driver: function(opts) {
      if (opts.name === 'analogSensor') {
        return new Cylon.Drivers.GPIO.AnalogSensor(opts);
      } else if (opts.name === 'button') {
        return new Cylon.Drivers.GPIO.Button(opts);
      } else if (opts.name === 'led') {
        return new Cylon.Drivers.GPIO.Led(opts);
      } else if (opts.name === 'maxbotix') {
        return new Cylon.Drivers.GPIO.Maxbotix(opts);
      } else if (opts.name === 'motor') {
        return new Cylon.Drivers.GPIO.Motor(opts);
      } else if (opts.name === 'servo') {
        return new Cylon.Drivers.GPIO.Servo(opts);
      } else {
        return null;
      }
    },
    register: function(robot) {
      Logger.debug("Registering GPIO analogSensor driver for " + robot.name);
      robot.registerDriver('cylon-gpio', 'analogSensor');
      Logger.debug("Registering GPIO button driver for " + robot.name);
      robot.registerDriver('cylon-gpio', 'button');
      Logger.debug("Registering GPIO LED driver for " + robot.name);
      robot.registerDriver('cylon-gpio', 'led');
      Logger.debug("Registering GPIO Maxbotix driver for " + robot.name);
      robot.registerDriver('cylon-gpio', 'maxbotix');
      Logger.debug("Registering GPIO Motor driver for " + robot.name);
      robot.registerDriver('cylon-gpio', 'motor');
      Logger.debug("Registering GPIO Servo driver for " + robot.name);
      return robot.registerDriver('cylon-gpio', 'servo');
    }
  };

}).call(this);
