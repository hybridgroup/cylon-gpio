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
require './continuous-servo'
require './led'
require './makey-button'
require './maxbotix'
require './motor'
require './servo'

module.exports =
  driver: (opts) ->
    switch opts.name
      when 'analogSensor' then new Cylon.Drivers.GPIO.AnalogSensor(opts)
      when 'button' then new Cylon.Drivers.GPIO.Button(opts)
      when 'continuous-servo' then new Cylon.Drivers.GPIO.ContinuousServo(opts)
      when 'led' then new Cylon.Drivers.GPIO.Led(opts)
      when 'makey-button' then new Cylon.Drivers.GPIO.MakeyButton(opts)
      when 'maxbotix' then new Cylon.Drivers.GPIO.Maxbotix(opts)
      when 'motor' then new Cylon.Drivers.GPIO.Motor(opts)
      when 'servo' then new Cylon.Drivers.GPIO.Servo(opts)
      else null

  register: (robot) ->
    Logger.debug "Registering GPIO AnalogSensor driver for #{robot.name}"
    robot.registerDriver 'cylon-gpio', 'analogSensor'
    Logger.debug "Registering GPIO Button driver for #{robot.name}"
    robot.registerDriver 'cylon-gpio', 'button'
    Logger.debug "Registering GPIO ContinuousServo driver for #{robot.name}"
    robot.registerDriver 'cylon-gpio', 'continuous-servo'
    Logger.debug "Registering GPIO LED driver for #{robot.name}"
    robot.registerDriver 'cylon-gpio', 'led'
    Logger.debug "Registering GPIO MakeyButton driver for #{robot.name}"
    robot.registerDriver 'cylon-gpio', 'button'
    Logger.debug "Registering GPIO Maxbotix driver for #{robot.name}"
    robot.registerDriver 'cylon-gpio', 'maxbotix'
    Logger.debug "Registering GPIO Motor driver for #{robot.name}"
    robot.registerDriver 'cylon-gpio', 'motor'
    Logger.debug "Registering GPIO Servo driver for #{robot.name}"
    robot.registerDriver 'cylon-gpio', 'servo'
