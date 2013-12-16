'use strict';

led = source("led")

describe "Cylon.Drivers.GPIO.Led", ->
  button = new Cylon.Drivers.GPIO.Led(name: 'blinky', device: {connection: 'connect', pin: 13})

  it "needs tests"
