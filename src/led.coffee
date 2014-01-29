###
 * LED driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

namespace = require 'node-namespace'

require './cylon-gpio'

namespace "Cylon.Drivers.GPIO", ->
  class @Led extends Cylon.Driver
    constructor: (opts) ->
      super
      @pin = @device.pin
      @isOn = false

    commands: ->
      ['turnOn', 'turnOff', 'toggle', 'brightness']

    # Public: Turns LED on.
    #
    # Returns null.
    turnOn: ->
      @isOn = true
      @connection.digitalWrite(@pin, 1)

    # Public: Turns LED off.
    #
    # Returns null.
    turnOff: ->
      @isOn = false
      @connection.digitalWrite(@pin, 0)

    # Public: Turns the LED on, or off, depending on if it is already off, or on, respectively.
    #
    # Returns null.
    toggle: ->
      if @isOn
        @turnOff()
      else
        @turnOn()

    # Public: Sets brightness of the led to the specified brightness value 
    # passed to brightness(brightness_int) using PWM, brightness can be any 
    # integer value between 0 and 255.
    #
    # value - params, The brightness level
    #
    # Returns null.
    brightness: (value) ->
      @connection.pwmWrite(@pin, value)
