/*
 * cylon-gpio
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require('cylon');

var Drivers = {
  'analog-sensor': require('./analog-sensor'),
  'analogSensor': require('./analog-sensor'),
  'button': require('./button'),
  'continuous-servo': require('./continuous-servo'),
  'led': require('./led'),
  'makey-button': require('./makey-button'),
  'maxbotix': require('./maxbotix'),
  'motor': require('./motor'),
  'servo': require('./servo'),
  'ir-range-sensor': require('./ir-range-sensor'),
  'direct-pin': require('./direct-pin')
};

module.exports = {
  drivers: Object.keys(Drivers),

  driver: function(opts) {
    for (var d in Drivers) {
      if (opts.driver === d) {
        return new Drivers[d](opts);
      }
    }

    return null;
  }
};
