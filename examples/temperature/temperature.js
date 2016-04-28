"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    edison: { adaptor: "intel-iot" }
  },

  devices: {
    temp: {driver: "temperature-sensor", pin: 3}
  },

  work: function(my) {
    every(100, function() {
      console.log(my.temp.celsius());
    });
  }
}).start();
