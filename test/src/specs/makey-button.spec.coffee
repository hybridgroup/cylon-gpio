'use strict'

MakeyButton = source "makey-button"

describe "Cylon.Drivers.GPIO.MakeyButton", ->
  driver = new MakeyButton(name: 'button', device: {connection: 'connect', pin: 13})

  describe "#constructor", ->
    it "sets @pin to the passed device's pin", ->
      expect(driver.pin).to.be.eql 13

    it "sets @isPressed to false by default", ->
      expect(driver.isPressed).to.be.false

    it "sets @data to an empty array by default", ->
      expect(driver.data).to.be.eql []

  it "provides an array of makey-button commands", ->
    expect(driver.commands()).to.be.eql ['isPressed']

  describe '#averateData', ->
    context "when @data is empty", ->
      before -> driver.data = []

      it "returns 0", ->
        expect(driver.averageData()).to.be.eql 0

    context "when @data is an array of values", ->
      before -> driver.data = [0, 0, 10, 10]

      it "returns an average", ->
        expect(driver.averageData()).to.be.eql 5
