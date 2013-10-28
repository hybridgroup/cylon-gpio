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

  module.exports = {
    driver: function(opts) {
      if (opts.name === 'led') {
        return new Cylon.Driver.GPIO.Led(opts);
      } else if (opts.name === 'button') {
        return new Cylon.Driver.GPIO.Button(opts);
      }
    },
    register: function(robot) {
      Logger.debug("Registering GPIO LED driver for " + robot.name);
      robot.registerDriver('cylon-gpio', 'led');
      Logger.debug("Registering GPIO button driver for " + robot.name);
      return robot.registerDriver('cylon-gpio', 'button');
    }
  };

}).call(this);
