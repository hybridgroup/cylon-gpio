'use strict'

LED = source "led"

describe "Cylon.Drivers.GPIO.Led", ->
  driver = new LED(name: 'blinky', device: {connection: 'connect', pin: 13})
  spy = sinon.spy

  describe 'constructor', ->
    it "sets @pin to the value of the passed device's pin", ->
      expect(driver.pin).to.be.eql 13

    it "sets @isOn to false by default", ->
      expect(driver.isOn).to.be.false

  it "has led commands", ->
    expect(driver.commands()).to.be.eql ['turnOn', 'turnOff', 'toggle', 'brightness']

  describe '#turnOn', ->
    it 'writes a high value to the pin', ->
      connection = { digitalWrite: spy() }
      driver.isOn = false
      driver.connection = connection

      driver.turnOn()

      expect(driver.isOn).to.be.true

      assert connection.digitalWrite.calledOnce
      assert connection.digitalWrite.calledWith 13, 1

  describe '#turnOff', ->
    it 'writes a high value to the pin', ->
      connection = { digitalWrite: spy() }
      driver.isOn = true
      driver.connection = connection

      driver.turnOff()

      expect(driver.isOn).to.be.false

      assert connection.digitalWrite.calledOnce
      assert connection.digitalWrite.calledWith 13, 0

  describe '#toggle', ->
    context 'when @isOn is true', ->
      it 'turns the light off', ->
        driver.isOn = true
        turnOff = sinon.stub driver, 'turnOff'

        driver.toggle()

        assert turnOff.calledOnce

    context 'when @isOn is false', ->
      it 'turns the light on', ->
        driver.isOn = false
        turnOn = sinon.stub driver, 'turnOn'

        driver.toggle()

        assert turnOn.calledOnce
