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

    # Public: Stops the driver
    #
    # Returns null.
    stop: ->
      @connection.servoWrite(@pin, 90)

    # Public: Turns the servo to go clockwise, if the driver is continuous.
    #
    # Returns true | nil.
    clockwise: ->
      Logger.debug "Servo on pin #{@pin} turning clockwise"
      @connection.servoWrite(@pin, 180)

    # Public: Turns the servo to go counter clockwise, if the driver is continuous.
    #
    # Returns true | nil.
    counterClockwise: ->
      Logger.debug "Servo on pin #{@pin} turning counter clockwise"
      @connection.servoWrite(@pin, 89)
