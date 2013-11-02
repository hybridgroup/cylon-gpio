# Cylon.js For GPIO

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using Node.js

This module provides drivers for General Purpose Input/Output (GPIO) devices (https://en.wikipedia.org/wiki/General_Purpose_Input/Output). It is normally not used directly, but instead is registered by adaptor modules such as cylon-firmata (https://github.com/hybridgroup/cylon-firmata) that support the needed interfaces for GPIO devices.

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-gpio.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-gpio)

## Getting Started
Install the module with: `npm install cylon-gpio`

## Examples

### Javascript:
```javascript
var Cylon = require('cylon');

// Initialize the robot
Cylon.robot({
  connection: { name: 'arduino', adaptor: 'firmata', port: '/dev/ttyACM0' },
  devices: [{name: 'led', driver: 'led', pin: 13},
            {name: 'button', driver: 'button', pin: 2}],

  work: function(my) {
    my.button.on('push', function() {my.led.toggle()});
  }
}).start();
```

### CoffeeScript:
```coffee-script
Cylon = require('cylon')

# Initialize the robot
Cylon.robot
  connection:
    name: 'arduino', adaptor: 'firmata', port: '/dev/ttyACM0'

  devices:
    [
      {name: 'led', driver: 'led', pin: 13},
      {name: 'button', driver: 'button', pin: 2}
    ]

  work: (my) ->
    my.button.on 'push', -> my.led.toggle()

.start()
```
## Hardware Support
Cylon.js has a extensible system for connecting to hardware devices. The following GPIO devices are currently supported:

  - Analog Sensor
  - Button
  - LED
  - Motor
  - Servo

More drivers are coming soon...

## Documentation
We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
Version 0.1.0 - Initial release with support for AnalogSensor, Button, and LED

Version 0.2.0 - Add Motor and Servo support, refactor to use Basestar

## License
Copyright (c) 2013 The Hybrid Group. Licensed under the Apache 2.0 license.
