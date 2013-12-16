'use strict';

servo = source("servo")

describe "Cylon.Drivers.GPIO.ContinuousServo", ->
  button = new Cylon.Drivers.GPIO.ContinuousServo(name: 'serv', device: {connection: 'connect', pin: 13})

  it "needs tests"
