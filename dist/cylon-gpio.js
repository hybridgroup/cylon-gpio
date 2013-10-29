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

  module.exports = {
    driver: function(opts) {
      if (opts.name === 'led') {
        return new Cylon.Driver.GPIO.Led(opts);
      } else if (opts.name === 'button') {
        return new Cylon.Driver.GPIO.Button(opts);
      } else if (opts.name === 'analogSensor') {
        return new Cylon.Driver.GPIO.AnalogSensor(opts);
      }
    },
    register: function(robot) {
      Logger.debug("Registering GPIO LED driver for " + robot.name);
      robot.registerDriver('cylon-gpio', 'led');
      Logger.debug("Registering GPIO button driver for " + robot.name);
      robot.registerDriver('cylon-gpio', 'button');
      Logger.debug("Registering GPIO analogSensor driver for " + robot.name);
      return robot.registerDriver('cylon-gpio', 'analogSensor');
    }
  };

}).call(this);
