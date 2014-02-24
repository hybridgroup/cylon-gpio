'use strict'

MOTOR = source "motor"

describe "Cylon.Drivers.GPIO.Motor", ->
  motor = new MOTOR(name: 'vrroom', device: {connection: 'connect', pin: 13})
  spy = sinon.spy

  describe 'constructor', ->
    it "sets @pin to the value of the passed device's pin", ->
      expect(motor.pin).to.be.eql 13

    it "sets @speedvalue to 0 by default", ->
      expect(motor.speedValue).to.be.eql 0

    it "sets @isOn to false by default", ->
      expect(motor.isOn).to.be.false

  it 'provides a list of motor commands', ->
    commands = ['turnOn', 'turnOff', 'toggle', 'speed', 'currentSpeed']
    expect(motor.commands()).to.be.eql commands

  describe "#turnOn", ->
    it "writes a high value to the digital pin", ->
      connection = { digitalWrite: spy() }
      motor.connection = connection

      motor.turnOn()

      expect(motor.isOn).to.be.true

      assert connection.digitalWrite.calledOnce
      assert connection.digitalWrite.calledWith 13, 1

  describe "#turnOff", ->
    it "writes a low value to the digital pin", ->
      connection = { digitalWrite: spy() }
      motor.connection = connection

      motor.turnOff()

      expect(motor.isOn).to.be.false

      assert connection.digitalWrite.calledOnce
      assert connection.digitalWrite.calledWith 13, 0

  describe "#toggle", ->
    context "when @isOn is true", ->
      it "turns the motor off", ->
        motor.isOn = true
        turnOff = sinon.stub motor, 'turnOff'

        motor.toggle()

        assert turnOff.calledOnce

    context "when @isOn is false", ->
      it "turns the motor on", ->
        motor.isOn = false
        turnOn = sinon.stub motor, 'turnOn'

        motor.toggle()

        assert turnOn.calledOnce


  describe "#currentSpeed", ->
    it "returns the current @speedValue of the motor", ->
      motor.speedValue = 120
      expect(motor.currentSpeed()).to.be.eql 120

  describe "#speed", ->
    before ->
      connection = { pwmWrite: spy() }
      motor.connection = connection
      motor.speed(100)

    it "writes the speed value to the pin via the connection", ->
      assert motor.connection.pwmWrite.calledOnce
      assert motor.connection.pwmWrite.calledWith 13, 100

    it "sets @speedValue to the passed value", ->
      expect(motor.speedValue).to.be.eql 100

    it "sets @isOn depending on whether the speed is greater than 0", ->
      expect(motor.isOn).to.be.true
      motor.speed(0)
      expect(motor.isOn).to.be.false
