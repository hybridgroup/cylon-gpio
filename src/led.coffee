###
 * LED driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';
namespace = require 'node-namespace'

namespace "Cylon.Driver.GPIO", ->
  class @Led
    constructor: (opts) ->
      @self = this
      @device = opts.device
      @connection = @device.connection
      @pin = @device.pin
      @isOn = false

    commands: ->
      ['turnOn', 'turnOff', 'toggle', 'brightness']

    start: (callback) ->
      Logger.debug "LED on pin #{@pin} started"
      (callback)(null)
      @device.emit 'start'

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
