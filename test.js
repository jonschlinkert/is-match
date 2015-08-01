/*!
 * is-match <https://github.com/jonschlinkert/is-match>
 *
 * Copyright (c) 2015 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

/* deps: mocha */
var should = require('should');
var matcher = require('./');

it('should throw if not array, string, regexp, object or function', function () {
  function fixture () {
    matcher(1234)
  }
  should.throws(fixture, TypeError)
  should.throws(fixture, /expects a string, array, regex, plain object or function/)
})

describe('should return a matching function:', function () {
  it('from an object', function () {
    var isMatch = matcher({a: 'b'});

    isMatch({a: 'b'}).should.be.true;
    isMatch({a: 'b', c: 'd'}).should.be.false;
    isMatch({e: 'f', c: 'd'}).should.be.false;
  });

  it('from a string', function () {
    var isMatch = matcher('a');

    isMatch('a').should.be.true;
    isMatch('b').should.be.false;
    matcher('a')('abc').should.be.true;
    matcher('a')('def').should.be.false;
  });

  it('from a string glob pattern on single value', function () {
    matcher('*')('a').should.be.true;
    matcher('!b')('a').should.be.true;
    matcher('!b')('b').should.be.false;
  });

  it('from a string glob pattern on multiple values', function () {
    matcher('*')(['a', 'b']).should.be.true;
    matcher('{(b|[A-Z]),!([C-F])}.js')(['E.js', 'a.js']).should.be.false;
    matcher('{(b|[A-Z]),!([C-F])}.js')(['E.js', 'B.js']).should.be.true;
  });

  it('from a string non-glob pattern on single value', function () {
    matcher('abc')('foo abc bar').should.be.false;
    matcher('abc')('abc').should.be.true;
  })

  it('from a string non-glob pattern on multiple values', function () {
    matcher('abc')(['foo', 'abc']).should.be.true;
    matcher('abc')(['foo abc bar', 'baz']).should.be.true;
  });

  it('from an array of glob patterns on single value', function () {
    matcher(['a', 'b'])('a').should.be.true;
    matcher(['a', 'b'])('c').should.be.false;
    matcher(['*-koaip', '!foo-koa'])('x-koaip').should.be.true;
    matcher(['*-koaip', '!foo-koa'])('foo-koa').should.be.false;
    matcher(['*-koaip', '!foo-koa'])('bar').should.be.false;
  });

  it('from an array of glob patterns on multiple values', function () {
    matcher(['a', 'b'])(['a', 'c']).should.be.true;
    matcher(['a', 'b'])(['e', 'f', 'g']).should.be.false;
    matcher(['*-koaip', '!foo-koa'])(['x-koaip', 'bar-koa']).should.be.true;
    matcher(['*-koaip', '!foo-koa'])(['foo-koa', 'bar-koa']).should.be.false;
  });

  it('from a regex', function () {
    var isMatch = matcher(/a/);
    isMatch('a').should.be.true;
    isMatch('b').should.be.false;
  });

  it('from a function', function () {
    var isMatch = matcher(function  (val) {
      return val === 'a';
    });
    isMatch('a').should.be.true;
    isMatch('b').should.be.false;
  });
});
