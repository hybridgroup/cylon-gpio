"use strict";

/* eslint quote-props: 0 */

var Drivers = {
  "analog-sensor": require("./lib/analog-sensor"),
  "analogSensor": require("./lib/analog-sensor"),
  "button": require("./lib/button"),
  "continuous-servo": require("./lib/continuous-servo"),
  "led": require("./lib/led"),
  "makey-button": require("./lib/makey-button"),
  "maxbotix": require("./lib/maxbotix"),
  "motor": require("./lib/motor"),
  "relay": require("./lib/relay"),
  "servo": require("./lib/servo"),
  "ir-range-sensor": require("./lib/ir-range-sensor"),
  "direct-pin": require("./lib/direct-pin"),
  "rgb-led": require("./lib/rgb-led"),
  "temperature-sensor": require("./lib/temperature-sensor"),
  "tp401": require("./lib/tp401"),
};

module.exports = {
  drivers: Object.keys(Drivers),

  driver: function(opts) {
    opts = opts || {};

    if (!Drivers[opts.driver]) {
      return null;
    }

    return new Drivers[opts.driver](opts);
  }
};
