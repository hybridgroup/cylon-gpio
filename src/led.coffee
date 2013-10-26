
'use strict';

module.exports = class Driver.Led

Driver =
  Led: class Led
    constructor: (opts) ->
      @self = this
      @device = opts.device
      @connection = @device.connection
      @pin = @device.pin
      @isOn = false

    commands: ->
      ['turnOn', 'turnOff', 'toggle']

    start: (callback) ->
      Logger.debug "LED on pin #{@pin} started"
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
