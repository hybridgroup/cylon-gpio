###
 * Maxbotix ultrasonic rangefinder driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';
namespace = require 'node-namespace'

namespace "Cylon.Driver.GPIO", ->
  class @Maxbotix
    constructor: (opts) ->
      @self = this
      @device = opts.device
      @connection = @device.connection
      @pin = @device.pin
      @analogValue = 0

    commands: ->
      ['analogValue', 'range', 'rangeCm']

    start: (callback) ->
      Logger.debug "Maxbotix on pin #{@pin} started"
      @connection.analogRead @pin, (readVal) =>
        @self.analogValue = readVal
        @device.emit('range', @self.range())
        @device.emit('rangeCm', @self.rangeCm())

      (callback)(null)
      @device.emit 'start'

    stop: ->
      Logger.debug "Maxbotix on pin #{@pin} stopping"

    range: () ->
      return ( 254.0 / 1024.0 ) * 2.0 * @analogValue

    rangeCm: () ->
      return (@analogValue / 2.0) * 2.54
