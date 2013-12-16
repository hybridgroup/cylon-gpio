'use strict';

analogSensor = source("analog-sensor")

describe "Cylon.Drivers.GPIO.AnalogSensor", ->
  button = new Cylon.Drivers.GPIO.AnalogSensor(name: 'sensor', device: {connection: 'connect', pin: 13})

  it "needs tests"
