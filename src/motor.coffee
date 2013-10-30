###
 * Motor driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';
namespace = require 'node-namespace'

namespace "Cylon.Driver.GPIO", ->
  class @Motor
    constructor: (opts) ->
      @self = this
      @device = opts.device
      @connection = @device.connection
      @pin = @device.pin
      @current_speed = false
      @isOn

    commands: ->
      ['turnOn', 'turnOff', 'toggle', 'speed']

    start: (callback) ->
      Logger.debug "Motor on pin #{@pin} started"
      (callback)(null)

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

    speed: (value) ->
      console.log("speed -> #{ value }")
      @connection.pwmWrite(@pin, value)
      @current_speed = value
