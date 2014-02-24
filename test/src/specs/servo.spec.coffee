'use strict'

Servo = source "servo"

describe "Cylon.Drivers.GPIO.Servo", ->
  driver = new Servo(name: 'serv', device: {connection: 'connect', pin: 13})

  describe "constructor", ->
    it "sets @pin to the passed device's pin", ->
      expect(driver.pin).to.be.eql 13

    it "sets @angleValue to 0 by default", ->
      expect(driver.angleValue).to.be.eql 0

    context "if a servo range is supplied", ->
      it "@angleRange is set to provided range", ->
        new_driver = new Servo
          name: 'serv'
          device: { connection: 'connect', pin: 13 }
          extraParams: { range: { min: 0, max: 180 } }

        expect(new_driver.angleRange.min).to.be.eql 0
        expect(new_driver.angleRange.max).to.be.eql 180

    context "if no servo range is supplied", ->
      it "@angleRange defaults to 30-150", ->
        expect(driver.angleRange.min).to.be.eql 30
        expect(driver.angleRange.max).to.be.eql 150

  it "contains an array of servo commands", ->
    expect(driver.commands()).to.be.eql ['angle', 'currentAngle']

  describe '#currentAngle', ->
    it "returns the current value of the servo's angle", ->
      expect(driver.currentAngle()).to.be.eql 0
      driver.angleValue = 10
      expect(driver.currentAngle()).to.be.eql 10

  describe "#angle", ->
    connection = null
    safeAngle = null

    before ->
      safeAngle = sinon.stub(driver, 'safeAngle').returns(120)
      connection = { servoWrite: sinon.spy() }
      driver.connection = connection

      driver.angle(120)

    after ->
      driver.safeAngle.restore()

    it "ensures the value is safe", ->
      assert safeAngle.calledOnce
      assert safeAngle.calledWith 120

    it "writes the value to the servo", ->
      assert connection.servoWrite.calledOnce
      assert connection.servoWrite.calledWith 13, 120

    it "sets @angleValue to the new servo value", ->
      expect(driver.angleValue).to.be.eql 120

  describe "#safeAngle", ->
    before ->
      driver.angleRange = { min: 30, max: 130 }

    context "when passed a value below the servo's range min", ->
      it "returns the range's min value", ->
        expect(driver.safeAngle(10)).to.be.eql 30

    context "when passed a value above the servo's range max", ->
      it "returns the range's max value", ->
        expect(driver.safeAngle(180)).to.be.eql 130

    context "when passed a value within the servo's range", ->
      it "returns the value", ->
        expect(driver.safeAngle(50)).to.be.eql 50
