"use strict"

BUTTON = source "button"

describe "Cylon.Drivers.GPIO.Button", ->
  button = new BUTTON(name: 'button', device: {connection: 'connect', pin: 13})

  describe "constructor", ->
    it "sets @pin to the passed device's pin", ->
      expect(button.pin).to.be.eql 13

    it "sets @isPressed to false by default", ->
      expect(button.isPressed).to.be.false

  it "provides an array of button commands", ->
    expect(button.commands()).to.be.eql ['isPressed']

  describe "on the 'data' event", ->
    button.device = { emit: sinon.spy() }
    context "when 1", ->
      before ->
        button.connection = { digitalRead: (_, callback) -> callback(1) }
        button.start(->)

      it "emits 'push'", ->
        assert button.device.emit.calledWith 'push'

      it 'sets @isPressed to true', ->
        expect(button.isPressed).to.be.true

    context "when 0", ->
      before ->
        button.connection = { digitalRead: (_, callback) -> callback(0) }
        button.start(->)

      it "emits 'release'", ->
        assert button.device.emit.calledWith 'release'

      it 'sets @isPressed to false', ->
        expect(button.isPressed).to.be.false
