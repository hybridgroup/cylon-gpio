###
 * cylon-gpio
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

require('./led')

module.exports =
  driver: (opts) ->
    if opts.name is 'led'
      new Cylon.Driver.Led(opts)

  register: (robot) ->
    Logger.debug "Registering LED driver for #{robot.name}"
    robot.registerDriver 'cylon-gpio', 'led'

