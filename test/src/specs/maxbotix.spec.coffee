'use strict'

Maxbotix = source "maxbotix"

describe "Cylon.Drivers.GPIO.Maxbotix", ->
  driver = new Maxbotix(name: 'max', device: {connection: 'connect', pin: 13})

  describe "#constructor", ->
    it "sets @pin to the device's pin", ->
      expect(driver.pin).to.be.eql 13

    it "sets @analogValue to 0 by default", ->
      expect(driver.analogValue).to.be.eql 0

  it "has an array of maxbotix commands", ->
    expect(driver.commands()).to.be.eql ["analogValue", "range", "rangeCm"]

  describe "#range", ->
    context "with no reading", ->
      before -> driver.analogValue = 0

      it "returns 0", ->
        expect(driver.range()).to.equal 0

    context "with a reading of 20.1575", ->
      before -> driver.analogValue = 20.1575

      it "returns a value near 10", ->
        expect(driver.range()).to.be.closeTo 10, 0.0001

  describe "#rangeCm", ->
    context "with no reading", ->
      before -> driver.analogValue = 0

      it "returns 0", ->
        expect(driver.rangeCm()).to.equal 0

    context "with a reading of 20.1575", ->
      before -> driver.analogValue = 20.1575

      it "returns a value near 25.6", ->
        expect(driver.rangeCm()).to.be.closeTo 25.6, 0.0001
