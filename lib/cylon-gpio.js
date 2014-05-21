/*
 * cylon-gpio
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require('cylon');
var AnalogSensor = require('./analog-sensor');
var Button = require('./button');
var ContinuousServo = require('./continuous-servo');
var Led = require('./led');
var MakeyButton = require('./makey-button');
var Maxbotix = require('./maxbotix');
var Motor = require('./motor');
var Servo = require('./servo');
var IrRangeSensor = require('./ir-range-sensor');
var DirectPin = require('./direct-pin');

module.exports = {
  driver: function(opts) {
    switch (opts.name) {
      case 'analogSensor':
        return new AnalogSensor(opts);
      case 'button':
        return new Button(opts);
      case 'continuous-servo':
        return new ContinuousServo(opts);
      case 'led':
        return new Led(opts);
      case 'makey-button':
        return new MakeyButton(opts);
      case 'maxbotix':
        return new Maxbotix(opts);
      case 'motor':
        return new Motor(opts);
      case 'servo':
        return new Servo(opts);
      case 'ir-range-sensor':
        return new IrRangeSensor(opts);
      case 'direct-pin':
        return new DirectPin(opts);
      default:
        return null;
    }
  },

  register: function(robot) {
    Cylon.Logger.debug("Registering GPIO AnalogSensor driver for " + robot.name);
    robot.registerDriver('cylon-gpio', 'analogSensor');

    Cylon.Logger.debug("Registering GPIO Button driver for " + robot.name);
    robot.registerDriver('cylon-gpio', 'button');

    Cylon.Logger.debug("Registering GPIO ContinuousServo driver for " + robot.name);
    robot.registerDriver('cylon-gpio', 'continuous-servo');

    Cylon.Logger.debug("Registering GPIO LED driver for " + robot.name);
    robot.registerDriver('cylon-gpio', 'led');

    Cylon.Logger.debug("Registering GPIO MakeyButton driver for " + robot.name);
    robot.registerDriver('cylon-gpio', 'makey-button');

    Cylon.Logger.debug("Registering GPIO Maxbotix driver for " + robot.name);
    robot.registerDriver('cylon-gpio', 'maxbotix');

    Cylon.Logger.debug("Registering GPIO Motor driver for " + robot.name);
    robot.registerDriver('cylon-gpio', 'motor');

    Cylon.Logger.debug("Registering GPIO Servo driver for " + robot.name);
    robot.registerDriver('cylon-gpio', 'servo');

    Cylon.Logger.debug("Registering GPIO IR Range Sensor driver for " + robot.name);
    robot.registerDriver('cylon-gpio', 'ir-range-sensor');

    Cylon.Logger.debug("Registering GPIO DirectPin Driver for " + robot.name);
    robot.registerDriver('cylon-gpio', 'direct-pin');
  }
};
