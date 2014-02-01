###
 * Cylon button driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

require './cylon-gpio'

namespace = require 'node-namespace'

namespace "Cylon.Drivers.GPIO", ->
  class @MakeyButton extends Cylon.Driver
    constructor: (opts) ->
      super
      @pin = @device.pin
      @isPressed = false
      @data = []

    commands: ->
      ['isPressed']

    # Public: Starts the driver
    #
    # callback - params
    #
    # Returns null.
    start: (callback) ->
      @connection.digitalRead @pin, (data) =>
        @data.push data
        @data.shift

      every 100, =>
        if @averageData() > 0.5 and not @isPressed
          @isPressed = true
          @device.emit 'push'
        else if @averageData() <= 0.5 and @isPressed
          @isPressed = false
          @device.emit 'release'

      super

    averageData: ->
      result = 0
      if @data.length > 0
        @data.forEach (n) -> result += n
        result = result / @data.length

      result
