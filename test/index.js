'use strict'

var generator = require('..')
var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp-promise')
var read = require('fs-readfile-promise')
var rimraf = require('rimraf')
var util = require('util')

require('should-promised')

var target = path.join('test', 'tmp')

describe('npm generator', function () {
    afterEach(function (done) {
        rimraf(target, done)
    })

    it('should populate template variables', function (done) {
        var options = {
            author: 'lemon',
            description: ' lemon juice',
            email: 'lemon@juice.com',
            github: 'lemon',
            name: 'lemon juice',
            target: target,
            website: 'lemon.juice.com'
        }

        return generator(options)
            .then(function () {
                return read('test/tmp/package.json')
            })
            .then(JSON.parse)
            .then(function (pkg) {
                pkg.should.be.an.Object

                pkg.name.should.equal(options.name)
                pkg.description.should.equal(options.description)
                pkg.author.should.equal(util.format('%s <%s> (%s)', options.author, options.email, options.website))
                pkg.homepage.should.equal(util.format('https://github.com/%s/%s', options.github, options.name))

                return done()
            })
    })

    it ('should use process.cwd', function (done) {
        var cwd = process.cwd()

        mkdrip(target).then(function (made) {
            process.chdir(made)

            var options = {
                author: 'lemon',
                description: 'lemon juice',
                email: 'lemon@juice.com',
                github: 'lemon',
                name: 'lemon juice',
                website: 'lemon.juice.com'
            }

            return generator(options)
                .then(function (files) {
                    var file = path.dirname(files.pop())

                    file.should.be.a.string
                    path.relative(file, made).should.eql('..')

                    /* return to cwd */
                    process.chdir(cwd)

                    return done()
                })
        })
    })

    it('should return a list of files created', function () {
        var options = {
            author: 'lemon',
            description: ' lemon juice',
            email: 'lemon@juice.com',
            github: 'lemon',
            name: 'lemon juice',
            target: target,
            website: 'lemon.juice.com'
        }

        return generator(options).should.eventually.eql([
            'test/tmp/.editorconfig',
            'test/tmp/.env.example',
            'test/tmp/.gitattributes',
            'test/tmp/.gitignore',
            'test/tmp/.jshintrc',
            'test/tmp/.npmignore',
            'test/tmp/.travis.yml',
            'test/tmp/LICENSE',
            'test/tmp/README.md',
            'test/tmp/bin/bin',
            'test/tmp/docs/API.md',
            'test/tmp/docs/INSTALL.md',
            'test/tmp/lib/index.js',
            'test/tmp/package.json',
            'test/tmp/server.js',
            'test/tmp/src/index.js',
            'test/tmp/test/index.js'
        ])
    })

    it('should use evnvironment variables', function (done) {
        process.env.AUTHOR_EMAIL = 'lemon@juice.com'
        process.env.AUTHOR_NAME = 'lemon'
        process.env.AUTHOR_WEBSITE = 'lemon.juice.com'
        process.env.GITHUB_USERNAME = 'lemon'
        process.env.PACKAGE_NAME = 'lemon.juice'

        generator({
            target: target
        })

        .then(function () {
            return read('test/tmp/package.json')
        })
        .then(JSON.parse)
        .then(function (pkg) {
            pkg.name.should.equal(process.env.PACKAGE_NAME)

            return done()
        })
    })

    it('should install dependencies', function (done) {
        this.timeout(200000)

        var options = {
            install: true,
            quiet: true,
            target: target
        }

        generator(options)
            .then(function () {
                fs.existsSync(path.join(target, 'node_modules')).should.be.true

                return done()
            })
    })
})