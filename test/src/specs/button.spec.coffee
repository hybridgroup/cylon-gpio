'use strict';

button = source("button")

describe "Cylon.Drivers.GPIO.Button", ->
  button = new Cylon.Drivers.GPIO.Button(name: 'button', device: {connection: 'connect', pin: 13})

  it "needs tests"
