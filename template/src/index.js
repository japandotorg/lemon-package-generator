'use strict'

var debug = require('debug-log')('comp_name')
var lib = require('../lib')

module.exports = function () {
    lib()

    debug('application logic')
}