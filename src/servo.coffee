###
 * Servo driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

namespace = require 'node-namespace'

require './cylon-gpio'

namespace "Cylon.Drivers.GPIO", ->
  class @Servo extends Cylon.Driver
    constructor: (opts) ->
      super
      @pin = @device.pin
      @angleValue = 0

    commands: ->
      ['angle', 'currentAngle']

    start: (callback) ->
      Logger.debug "Servo on pin #{@pin} started"
      super

    stop: ->
      Logger.debug "Servo on pin #{@pin} stopping"
      super

    currentAngle: ->
      @angleValue

    angle: (value) ->
      @connection.servoWrite(@pin, value)
      @angleValue = value
