###
 * cylon-gpio
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

namespace = require 'node-namespace'

require 'cylon'

require './analog-sensor'
require './button'
require './led'
require './maxbotix'
require './motor'
require './servo'

module.exports =
  driver: (opts) ->
    if opts.name is 'analogSensor'
      new Cylon.Drivers.GPIO.AnalogSensor(opts)
    else if opts.name is 'button'
      new Cylon.Drivers.GPIO.Button(opts)
    else if opts.name is 'led'
      new Cylon.Drivers.GPIO.Led(opts)
    else if opts.name is 'maxbotix'
      new Cylon.Drivers.GPIO.Maxbotix(opts)
    else if opts.name is 'motor'
      new Cylon.Drivers.GPIO.Motor(opts)
    else if opts.name is 'servo'
      new Cylon.Drivers.GPIO.Servo(opts)
    else
      null

  register: (robot) ->
    Logger.debug "Registering GPIO analogSensor driver for #{robot.name}"
    robot.registerDriver 'cylon-gpio', 'analogSensor'
    Logger.debug "Registering GPIO button driver for #{robot.name}"
    robot.registerDriver 'cylon-gpio', 'button'
    Logger.debug "Registering GPIO LED driver for #{robot.name}"
    robot.registerDriver 'cylon-gpio', 'led'
    Logger.debug "Registering GPIO Maxbotix driver for #{robot.name}"
    robot.registerDriver 'cylon-gpio', 'maxbotix'
    Logger.debug "Registering GPIO Motor driver for #{robot.name}"
    robot.registerDriver 'cylon-gpio', 'motor'
    Logger.debug "Registering GPIO Servo driver for #{robot.name}"
    robot.registerDriver 'cylon-gpio', 'servo'
