var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'arduino', adaptor: 'firmata', port: '/dev/ttyACM0' },

  device: {
    name: 'sensor',
    driver: 'ir-range-sensor',
    pin: 0,
    model: 'gp2y0a41sk0f'
  },

  work: function(my) {

    my.sensor.on('range', function(data) {
      console.log('range event:', data);
    });

    my.sensor.on('rangeCm', function(data) {
      console.log('rangeCm event:', data);
    });

    every((1).seconds(), function(){
      var range = my.sensor.range(),
          rangeCm = my.sensor.rangeCm(),
          analogVal = my.sensor.analogRead();

      console.log('Range ===>', range);
      console.log('Range in Cm ===>', rangeCm);
      console.log('Analog Val from IR sensor ===>', analogVal);
    });
  }

}).start();
