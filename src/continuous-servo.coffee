###
 * Continuous Servo driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

require './cylon-gpio'

namespace = require 'node-namespace'

namespace "Cylon.Drivers.GPIO", ->
  class @ContinuousServo extends Cylon.Driver
    constructor: (opts = {}) ->
      super
      @pin = @device.pin
      @angleValue = 0

    commands: ->
      ['clockwise', 'counterClockwise', 'stop']

    stop: ->
      @connection.servoWrite(@pin, 90)

    clockwise: ->
      Logger.debug "Servo on pin #{@pin} turning clockwise"
      @connection.servoWrite(@pin, 180)

    counterClockwise: ->
      Logger.debug "Servo on pin #{@pin} turning counter clockwise"
      @connection.servoWrite(@pin, 89)
