'use strict'

LED = source "led"

describe "Cylon.Drivers.GPIO.Led", ->
  led = new LED(name: 'blinky', device: {connection: 'connect', pin: 13})
  spy = sinon.spy

  it "has LED commands", ->
    expect(led.commands()).to.be.eql ['turnOn', 'turnOff', 'toggle', 'brightness']

  describe '#turnOn', ->
    it 'writes a high value to the pin', ->
      connection = { digitalWrite: spy() }
      led.isOn = false
      led.connection = connection

      led.turnOn()

      expect(led.isOn).to.be.eql true

      assert connection.digitalWrite.calledOnce
      assert connection.digitalWrite.calledWith 13, 1

  describe '#turnOff', ->
    it 'writes a high value to the pin', ->
      connection = { digitalWrite: spy() }
      led.isOn = true
      led.connection = connection

      led.turnOff()

      expect(led.isOn).to.be.eql false

      assert connection.digitalWrite.calledOnce
      assert connection.digitalWrite.calledWith 13, 0

  describe '#toggle', ->
    context 'when @isOn is true', ->
      it 'turns the light off', ->
        led.isOn = true
        turnOff = sinon.stub led, 'turnOff'

        led.toggle()

        assert turnOff.calledOnce

    context 'when @isOn is false', ->
      it 'turns the light on', ->
        led.isOn = false
        turnOn = sinon.stub led, 'turnOn'

        led.toggle()

        assert turnOn.calledOnce
