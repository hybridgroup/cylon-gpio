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
      @angleRange = if opts.extraParams? and opts.extraParams.range? then opts.extraParams.range else { min: 30, max: 150}

    commands: ->
      ['angle', 'currentAngle']

    # Public: Returns the current angle of the servo, an integer value 
    # between 0 and 180.
    #
    # Returns null.
    currentAngle: ->
      @angleValue

    # Public: Moves the servo to the specified angle, angle must be an 
    # integer value between 0 and 180.
    #
    # value - params
    #
    # Returns null.
    angle: (value) ->
      value = @safeAngle(value)
      @connection.servoWrite(@pin, value)
      @angleValue = value

    # Public: Saves an specified angle, angle must be an 
    # integer value between 0 and 180.
    #
    # value - params
    #
    # Returns null.
    safeAngle: (value) ->
      if value < @angleRange.min or value > @angleRange.max
        if value < @angleRange.min
          value = @angleRange.min
        else
          value = @angleRange.max

      value
