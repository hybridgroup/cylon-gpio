'use strict'

Motor = source "motor"

describe "Cylon.Drivers.GPIO.Motor", ->
  driver = new Motor(name: 'vrroom', device: {connection: 'connect', pin: 13})
  spy = sinon.spy

  describe 'constructor', ->
    it "sets @pin to the value of the passed device's pin", ->
      expect(driver.pin).to.be.eql 13

    it "sets @speedvalue to 0 by default", ->
      expect(driver.speedValue).to.be.eql 0

    it "sets @isOn to false by default", ->
      expect(driver.isOn).to.be.false

  it 'provides a list of motor commands', ->
    commands = ['turnOn', 'turnOff', 'toggle', 'speed', 'currentSpeed']
    expect(driver.commands()).to.be.eql commands

  describe "#turnOn", ->
    it "writes a high value to the digital pin", ->
      connection = { digitalWrite: spy() }
      driver.connection = connection

      driver.turnOn()

      expect(driver.isOn).to.be.true

      assert connection.digitalWrite.calledOnce
      assert connection.digitalWrite.calledWith 13, 1

  describe "#turnOff", ->
    it "writes a low value to the digital pin", ->
      connection = { digitalWrite: spy() }
      driver.connection = connection

      driver.turnOff()

      expect(driver.isOn).to.be.false

      assert connection.digitalWrite.calledOnce
      assert connection.digitalWrite.calledWith 13, 0

  describe "#toggle", ->
    context "when @isOn is true", ->
      it "turns the motor off", ->
        driver.isOn = true
        turnOff = sinon.stub driver, 'turnOff'

        driver.toggle()

        assert turnOff.calledOnce

    context "when @isOn is false", ->
      it "turns the motor on", ->
        driver.isOn = false
        turnOn = sinon.stub driver, 'turnOn'

        driver.toggle()

        assert turnOn.calledOnce


  describe "#currentSpeed", ->
    it "returns the current @speedValue of the motor", ->
      driver.speedValue = 120
      expect(driver.currentSpeed()).to.be.eql 120

  describe "#speed", ->
    before ->
      connection = { pwmWrite: spy() }
      driver.connection = connection
      driver.speed(100)

    it "writes the speed value to the pin via the connection", ->
      assert driver.connection.pwmWrite.calledOnce
      assert driver.connection.pwmWrite.calledWith 13, 100

    it "sets @speedValue to the passed value", ->
      expect(driver.speedValue).to.be.eql 100

    it "sets @isOn depending on whether the speed is greater than 0", ->
      expect(driver.isOn).to.be.true
      driver.speed(0)
      expect(driver.isOn).to.be.false
