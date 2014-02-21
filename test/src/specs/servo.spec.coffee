'use strict'

SERVO = source "servo"

describe "Cylon.Drivers.GPIO.Servo", ->
  servo = new SERVO(name: 'serv', device: {connection: 'connect', pin: 13})

  describe "constructor", ->
    it "sets @pin to the passed device's pin", ->
      expect(servo.pin).to.be.eql 13

    it "sets @angleValue to 0 by default", ->
      expect(servo.angleValue).to.be.eql 0

    context "if a servo range is supplied", ->
      it "@angleRange is set to provided range", ->
        new_servo = new SERVO
          name: 'serv'
          device: { connection: 'connect', pin: 13 }
          extraParams: { range: { min: 0, max: 180 } }

        expect(new_servo.angleRange.min).to.be.eql 0
        expect(new_servo.angleRange.max).to.be.eql 180

    context "if no servo range is supplied", ->
      it "@angleRange defaults to 30-150", ->
        expect(servo.angleRange.min).to.be.eql 30
        expect(servo.angleRange.max).to.be.eql 150

  it "contains an array of servo commands", ->
    expect(servo.commands()).to.be.eql ['angle', 'currentAngle']

  describe '#currentAngle', ->
    it "returns the current value of the servo's angle", ->
      expect(servo.currentAngle()).to.be.eql 0
      servo.angleValue = 10
      expect(servo.currentAngle()).to.be.eql 10

  describe "#angle", ->
    connection = null
    safeAngle = null

    before ->
      safeAngle = sinon.stub(servo, 'safeAngle').returns(120)
      connection = { servoWrite: sinon.spy() }
      servo.connection = connection

      servo.angle(120)

    after ->
      servo.safeAngle.restore()

    it "ensures the value is safe", ->
      assert safeAngle.calledOnce
      assert safeAngle.calledWith 120

    it "writes the value to the servo", ->
      assert connection.servoWrite.calledOnce
      assert connection.servoWrite.calledWith 13, 120

    it "sets @angleValue to the new servo value", ->
      expect(servo.angleValue).to.be.eql 120

  describe "#safeAngle", ->
    before ->
      servo.angleRange = { min: 30, max: 130 }

    context "when passed a value below the servo's range min", ->
      it "returns the range's min value", ->
        expect(servo.safeAngle(10)).to.be.eql 30

    context "when passed a value above the servo's range max", ->
      it "returns the range's max value", ->
        expect(servo.safeAngle(180)).to.be.eql 130

    context "when passed a value within the servo's range", ->
      it "returns the value", ->
        expect(servo.safeAngle(50)).to.be.eql 50
