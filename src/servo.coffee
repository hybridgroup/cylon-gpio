###
 * Servo driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

require './cylon-gpio'

namespace = require 'node-namespace'

namespace "Cylon.Drivers.GPIO", ->
  class @Servo extends Cylon.Driver
    constructor: (opts = {}) ->
      super
      @pin = @device.pin
      extraParams = opts.extraParams or {}
      @type = extraParams.type or 'standard'
      @angleValue = 0

    commands: ->
      if @type is 'continuous'
        ['clockwise', 'counterClockwise', 'stop']
      else
        ['angle', 'currentAngle']

    currentAngle: ->
      @angleValue

    angle: (value) ->
      @connection.servoWrite(@pin, value)
      @angleValue = value

    stop: ->
      if @type is 'continuous'
        Logger.debug "Continuous Servo on pin #{@pin} stopping"
        @connection.servoWrite(@pin, 90)

    clockwise: ->
      if @type is 'continuous'
        Logger.debug "Servo on pin #{@pin} turning clockwise"
        @connection.servoWrite(@pin, 180)
      else
        Logger.debug "Servo can't turn clockwise since it is not continuous"

    counterClockwise: ->
      if @type is 'continuous'
        Logger.debug "Servo on pin #{@pin} turning counter clockwise"
        @connection.servoWrite(@pin, 89)
      else
        Logger.debug "Servo can't turn counterclockwise since it is not continuous"
