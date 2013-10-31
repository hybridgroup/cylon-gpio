/*
 * cylon-gpio
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  require('./led');

  require('./button');

  require('./analog-sensor');

  require('./motor');

  require('./servo');

  module.exports = {
    driver: function(opts) {
      if (opts.name === 'led') {
        return new Cylon.Driver.GPIO.Led(opts);
      } else if (opts.name === 'button') {
        return new Cylon.Driver.GPIO.Button(opts);
      } else if (opts.name === 'analogSensor') {
        return new Cylon.Driver.GPIO.AnalogSensor(opts);
      } else if (opts.name === 'motor') {
        return new Cylon.Driver.GPIO.Motor(opts);
      } else if (opts.name === 'servo') {
        return new Cylon.Driver.GPIO.Servo(opts);
      }
    },
    register: function(robot) {
      Logger.debug("Registering GPIO LED driver for " + robot.name);
      robot.registerDriver('cylon-gpio', 'led');
      Logger.debug("Registering GPIO button driver for " + robot.name);
      robot.registerDriver('cylon-gpio', 'button');
      Logger.debug("Registering GPIO analogSensor driver for " + robot.name);
      robot.registerDriver('cylon-gpio', 'analogSensor');
      Logger.debug("Registering GPIO Motor driver for " + robot.name);
      robot.registerDriver('cylon-gpio', 'motor');
      Logger.debug("Registering GPIO Servo driver for " + robot.name);
      return robot.registerDriver('cylon-gpio', 'servo');
    }
  };

}).call(this);
