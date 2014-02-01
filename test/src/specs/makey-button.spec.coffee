'use strict';

button = source("button")

describe "Cylon.Drivers.GPIO.MakeyButton", ->
  button = new Cylon.Drivers.GPIO.MakeyButton(name: 'button', device: {connection: 'connect', pin: 13})

  it "needs tests"
