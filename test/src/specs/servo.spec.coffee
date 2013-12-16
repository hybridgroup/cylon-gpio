'use strict';

servo = source("servo")

describe "Cylon.Drivers.GPIO.Servo", ->
  button = new Cylon.Drivers.GPIO.Servo(name: 'serv', device: {connection: 'connect', pin: 13})

  it "needs tests"
