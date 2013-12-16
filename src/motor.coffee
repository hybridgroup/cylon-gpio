###
 * Motor driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

namespace = require 'node-namespace'

require './cylon-gpio'

namespace "Cylon.Drivers.GPIO", ->
  class @Motor extends Cylon.Driver
    constructor: (opts) ->
      super
      @pin = @device.pin
      @speedValue = 0
      @isOn = false

    commands: ->
      ['turnOn', 'turnOff', 'toggle', 'speed', 'currentSpeed']

    start: (callback) ->
      Logger.debug "Motor on pin #{@pin} started"
      super

    stop: ->
      Logger.debug "Motor on pin #{@pin} stopping"
      super

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

    currentSpeed: ->
      @speedValue

    speed: (value) ->
      @connection.pwmWrite(@pin, value)
      @speedValue = value
      @isOn = (@currentSpeed > 0)
