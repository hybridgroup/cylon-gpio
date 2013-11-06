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
      @angleValue = 0

    commands: ->
      ['angle', 'currentAngle']

    start: (callback) ->
      Logger.debug "Servo on pin #{@pin} started"
      (callback)(null)
      @device.emit 'start'

    stop: ->
      Logger.debug "Servo on pin #{@pin} stopping"

    currentAngle: ->
      @angleValue

    angle: (value) ->
      @connection.servoWrite(@pin, value)
      @angleValue = value
