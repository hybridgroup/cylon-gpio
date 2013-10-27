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

  module.exports = {
    driver: function(opts) {
      if (opts.name === 'led') {
        return new Cylon.Driver.Led(opts);
      }
    },
    register: function(robot) {
      Logger.debug("Registering LED driver for " + robot.name);
      return robot.registerDriver('cylon-gpio', 'led');
    }
  };

}).call(this);
