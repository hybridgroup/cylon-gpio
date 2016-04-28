# Cylon.js For GPIO

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics, physical computing, and the Internet of Things (IoT).

This module provides drivers for General Purpose Input/Output (GPIO) devices (https://en.wikipedia.org/wiki/General_Purpose_Input/Output). It must be used along with an adaptor module such as cylon-firmata (https://github.com/hybridgroup/cylon-firmata) that supports the needed interfaces for GPIO devices.

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-gpio.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-gpio) [![Code Climate](https://codeclimate.com/github/hybridgroup/cylon-gpio/badges/gpa.svg)](https://codeclimate.com/github/hybridgroup/cylon-gpio) [![Test Coverage](https://codeclimate.com/github/hybridgroup/cylon-gpio/badges/coverage.svg)](https://codeclimate.com/github/hybridgroup/cylon-gpio)

## Getting Started
Install the module with: `npm install cylon cylon-gpio`

Note you must also install whichever adaptor you want to use, such as: `npm install cylon-firmata`

## Example

```javascript
var Cylon = require('cylon');

// Initialize the robot
Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/ttyACM0' }
  },

  devices: {
    led: { driver: 'led', pin: 13 },
    button: { driver: 'button', pin: 2 }
  },

  work: function(my) {
    my.button.on('push', my.led.toggle);
  }
}).start();
```

## Hardware Support
Cylon.js has a extensible system for connecting to hardware devices. The following 14 GPIO devices are currently supported:

  - Analog Sensor
  - Button
  - Continuous Servo
  - Direct Pin
  - IR Range Sensor
  - LED
  - Makey Button (high-resistance button like the [MakeyMakey](http://www.makeymakey.com/))
  - Maxbotix Ultrasonic Range Finder
  - Motor
  - Relay
  - RGB LED
  - Servo
  - Temperature Sensor
  - TP401 Gas Sensor

More drivers are coming soon...

## Documentation
We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing

For our contribution guidelines, please go to [https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
](https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
).

## Release History

For the release history, please go to [https://github.com/hybridgroup/cylon-gpio/blob/master/RELEASES.md
](https://github.com/hybridgroup/cylon-gpio/blob/master/RELEASES.md
).

## License
Copyright (c) 2013-2016 The Hybrid Group. Licensed under the Apache 2.0 license.
