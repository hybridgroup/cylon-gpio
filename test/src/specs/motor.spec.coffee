'use strict';

motor = source("motor")

describe "Cylon.Drivers.GPIO.Motor", ->
  button = new Cylon.Drivers.GPIO.Motor(name: 'vrroom', device: {connection: 'connect', pin: 13})

  it "needs tests"
