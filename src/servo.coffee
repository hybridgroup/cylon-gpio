###
 * Servo driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';
namespace = require 'node-namespace'

namespace "Cylon.Driver.GPIO", ->
  class @Servo
    constructor: (opts) ->
      @self = this
      @device = opts.device
      @connection = @device.connection
      @pin = @device.pin
      @type = opts.type || 'standard'
      @angleValue = 0

    commands: ->
      cmds = ['angle', 'currentAngle']
      cmds += ['clockwise', 'counterClockwise', 'stop'] if @type is 'continuous'
      cmds

    start: (callback) ->
      Logger.debug "Servo on pin #{@pin} started"
      (callback)(null)
      @device.emit 'start'

    currentAngle: ->
      @angleValue

    angle: (value) ->
      @connection.servoWrite(@pin, value)
      @angleValue = value

    stop: ->
      if @type is 'continuous'
        Logger.debug "Servo on pin #{@pin} stopping"
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
        @connection.servoWrite(@pin, 0)
      else
        Logger.debug "Servo can't turn counterclockwise since it is not continuous"
