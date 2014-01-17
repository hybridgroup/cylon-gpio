###
 * Servo driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict'

require './cylon-gpio'

namespace = require 'node-namespace'

namespace "Cylon.Drivers.GPIO", ->
  class @Servo extends Cylon.Driver
    constructor: (opts = {}) ->
      super
      @pin = @device.pin
      @angleValue = 0
      @safetyLock = true

    commands: ->
      ['angle', 'currentAngle', 'unlockAngleSafety']

    currentAngle: ->
      @angleValue

    angle: (value) ->
      value = @angleSafety(value) if @safetyLock
      @connection.servoWrite(@pin, value)
      @angleValue = value

    angleSafety: (value) ->
      if value < 30 or value > 150
        if value < 30
          value = 30
        else
          value = 150

      value

    # Use to unlock the safety on the servo angle at your
    # own risk.
    unlockAngleSafety: () ->
      @safetyLock = false
