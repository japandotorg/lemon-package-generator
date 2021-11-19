/* global describe, it */

'use strict'

/* comp = componenet */
var comp_name = require('..')

require('should')

describe('comp_name', function () {
    it('must have at least one test', function (done) {
        name()

        true.should.be.true

        done()
    })
})