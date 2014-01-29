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

    # Public: Starts the motor.
    #
    # Returns nil.
    turnOn: ->
      @isOn = true
      @connection.digitalWrite(@pin, 1)
    
    # Public: Stops the motor.
    #
    # Returns nil.
    turnOff: ->
      @isOn = false
      @connection.digitalWrite(@pin, 0)
    
    # Public: Sets the state of the motor to the oposite of the current state, 
    # if motor is on then sets it to off.
    #
    # Returns true | nil.
    toggle: ->
      if @isOn
        @turnOff()
      else
        @turnOn()

    # Public: Returns the current speed of the motor as an integer between 0 and 255.
    #
    # Returns integer.
    currentSpeed: ->
      @speedValue

    # Public: Sets the speed of the motor to the value provided in the 
    # speed param, speed value must be an integer between 0 and 255.
    #
    # value- params
    #
    # Returns integer.
    speed: (value) ->
      @connection.pwmWrite(@pin, value)
      @speedValue = value
      @isOn = (@currentSpeed > 0)
