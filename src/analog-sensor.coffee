###
 * Analog Sensor driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

require './cylon-gpio'

namespace = require 'node-namespace'

namespace "Cylon.Drivers.GPIO", ->
  class @AnalogSensor extends Cylon.Driver
    constructor: (opts) ->
      super
      @pin = @device.pin
      extraParams = opts.extraParams or {}
      @upperLimit = extraParams.upperLimit or 256
      @lowerLimit = extraParams.lowerLimit or 0
      @analog_val = null

    commands: ->
      ['analogRead']
      
    # Public: Starts the driver
    #
    # callback - params
    #
    # Returns null.
    start: (callback) ->
      @connection.analogRead @pin, (readVal) =>
        @analogVal = readVal
        @device.emit('analogRead', readVal)
        if readVal >= @upperLimit
          @device.emit('upperLimit', readVal)
        else if readVal <= @lowerLimit
          @device.emit('lowerLimit', readVal)

      super
