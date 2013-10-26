/*
 * cylon-gpio
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var __slice = [].slice;

  require('./led');

  module.exports = {
    driver: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Driver.Led, args, function(){});
    },
    register: function(robot) {
      Logger.debug("Registering LED driver for " + robot.name);
      return robot.registerDriver('cylon-gpio', 'led');
    }
  };

}).call(this);
