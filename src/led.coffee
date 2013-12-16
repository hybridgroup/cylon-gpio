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

    turnOn: ->
      @isOn = true
      @connection.digitalWrite(@pin, 1)

    turnOff: ->
      @isOn = false
      @connection.digitalWrite(@pin, 0)

    toggle: ->
      if @isOn
        @turnOff()
      else
        @turnOn()

    brightness: (value) ->
      @connection.pwmWrite(@pin, value)
