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

  require('./analog-sensor');

  require('./button');

  require('./continuous-servo');

  require('./led');

  require('./makey-button');

  require('./maxbotix');

  require('./motor');

  require('./servo');

  module.exports = {
    driver: function(opts) {
      switch (opts.name) {
        case 'analogSensor':
          return new Cylon.Drivers.GPIO.AnalogSensor(opts);
        case 'button':
          return new Cylon.Drivers.GPIO.Button(opts);
        case 'continuous-servo':
          return new Cylon.Drivers.GPIO.ContinuousServo(opts);
        case 'led':
          return new Cylon.Drivers.GPIO.Led(opts);
        case 'makey-button':
          return new Cylon.Drivers.GPIO.MakeyButton(opts);
        case 'maxbotix':
          return new Cylon.Drivers.GPIO.Maxbotix(opts);
        case 'motor':
          return new Cylon.Drivers.GPIO.Motor(opts);
        case 'servo':
          return new Cylon.Drivers.GPIO.Servo(opts);
        default:
          return null;
      }
    },
    register: function(robot) {
      Logger.debug("Registering GPIO AnalogSensor driver for " + robot.name);
      robot.registerDriver('cylon-gpio', 'analogSensor');
      Logger.debug("Registering GPIO Button driver for " + robot.name);
      robot.registerDriver('cylon-gpio', 'button');
      Logger.debug("Registering GPIO ContinuousServo driver for " + robot.name);
      robot.registerDriver('cylon-gpio', 'continuous-servo');
      Logger.debug("Registering GPIO LED driver for " + robot.name);
      robot.registerDriver('cylon-gpio', 'led');
      Logger.debug("Registering GPIO MakeyButton driver for " + robot.name);
      robot.registerDriver('cylon-gpio', 'button');
      Logger.debug("Registering GPIO Maxbotix driver for " + robot.name);
      robot.registerDriver('cylon-gpio', 'maxbotix');
      Logger.debug("Registering GPIO Motor driver for " + robot.name);
      robot.registerDriver('cylon-gpio', 'motor');
      Logger.debug("Registering GPIO Servo driver for " + robot.name);
      return robot.registerDriver('cylon-gpio', 'servo');
    }
  };

}).call(this);
