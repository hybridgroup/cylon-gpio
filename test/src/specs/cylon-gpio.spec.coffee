'use strict';

gpio = source("cylon-gpio")

describe "Cylon.Drivers.GPIO", ->
  it "standard async test", (done) ->
    bool = false
    bool.should.be.false

    setTimeout ->
      bool.should.be.false
      bool = true
      bool.should.be.true
    150

    setTimeout ->
      bool.should.be.true
      done()
    300

  it "standard sync test", ->
    data = []
    obj = id: 5, name: 'test'
    data.should.be.empty
    data.push obj
    data.should.have.length 1
    # soft equal
    data[0].should.be.eql obj
    # hard equal
    data[0].should.be.equal obj

  it "should be able to register", ->
    gpio.register.should.be.a 'function'

  it "should be able to create led driver", ->
    gpio.driver.should.be.a 'function'
