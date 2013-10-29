###
 * Analog Sensor driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';
namespace = require 'node-namespace'

namespace "Cylon.Driver.GPIO", ->
  class @AnalogSensor
    constructor: (opts) ->
      console.log('AnalogSensor driver opts =>')
      console.log(opts)
      @self = this
      @device = opts.device
      @connection = @device.connection
      @pin = @device.pin
      @upperLimit = opts.extraParams.upperLimit
      @lowerLimit = opts.extraParams.lowerLimit
      @analog_val = null

    commands: ->
      ['analogRead']

    start: (callback) ->
      Logger.debug "AnalogSensor on pin #{@pin} started"
      console.log("UPPER LIMIT VALUE => #{ @upperLimit }")
      console.log("LOWER LIMIT VALUE => #{ @lowerLimit }")
      @connection.analogRead(@pin, (readVal) =>
        @analogVal = readVal
        if readVal >= @upperLimit
          @device.emit('upperLimit', readVal)
        else if readVal <= @lowerLimit
          @device.emit('lowerLimit', readVal)

        @device.emit('analogRead', readVal)
      )
      (callback)(null)