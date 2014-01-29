###
 * Maxbotix ultrasonic rangefinder driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

namespace = require 'node-namespace'

require './cylon-gpio'

namespace "Cylon.Drivers.GPIO", ->
  class @Maxbotix extends Cylon.Driver
    constructor: (opts) ->
      super
      @pin = @device.pin
      @analogValue = 0

    commands: ->
      ['analogValue', 'range', 'rangeCm']

    # Public: Stops the driver
    #
    # Returns null.
    start: (callback) ->
      Logger.debug "Maxbotix on pin #{@pin} started"
      @device.connection.analogRead @pin, (readVal) =>
        @self.analogValue = readVal
        @device.emit('range', @self.range())
        @device.emit('rangeCm', @self.rangeCm())

      super

    # Public: Returns the distance measured by the sonar in inches.
    #
    # Returns number.
    range: () ->
      return ( 254.0 / 1024.0 ) * 2.0 * @analogValue

    # Public: Returns the distance measured by the sonar in cm.
    #
    # Returns number.
    rangeCm: () ->
      return (@analogValue / 2.0) * 2.54
