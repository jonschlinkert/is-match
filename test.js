/*!
 * is-match <https://github.com/jonschlinkert/is-match>
 *
 * Copyright (c) 2015 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

/* deps: mocha */
var assert = require('assert');
var matcher = require('./');

it('should throw if not array, string, regexp, object or function', function () {
  function fixture () {
    matcher(1234)
  }
  assert.throws(fixture, TypeError);
  assert.throws(fixture, /expects a string, array, regex, plain object or function/);
})

describe('should return a matching function:', function () {
  it('should match an object', function () {
    var isMatch = matcher({a: 'b'});
    assert(isMatch({a: 'b'}));
    assert(!isMatch({a: 'b', c: 'd'}));
    assert(!isMatch({e: 'f', c: 'd'}));
  });

  it('should match a string', function () {
    var isMatch = matcher('a');

    assert(isMatch('a'));
    assert(!isMatch('b'));
    assert(matcher('a')('abc'));
    assert(!matcher('a')('def'));
  });

  it('should match a string glob pattern on single value', function () {
    assert(matcher('*')('a'));
    assert(matcher('!b')('a'));
    assert(!matcher('!b')('b'));
  });

  it('should match a string glob pattern on multiple values', function () {
    assert(matcher('*')(['a', 'b']));
    assert(!matcher('!([a-e]).js')(['e.js', 'a.js']));
    assert(matcher('!([a-e]).js')(['e.js', 'a.js', 'f.js']));
    assert(!matcher('{b,[F-Z],!([B-F])}.js')(['E.js', 'B.js']));
  });

  it('should match a string non-glob pattern on single value', function () {
    assert(matcher('abc')('foo abc bar'));
    assert(!matcher('abc', {strict: true})('foo abc bar'));
    assert(!matcher('abc')('foo bar baz'));
    assert(matcher('abc')('abc'));
  })

  it('should match a string non-glob pattern on multiple values', function () {
    assert(matcher('abc')(['foo', 'abc']));
    assert(!matcher('abc')(['foo abc bar', 'baz']));
  });

  it('should match an array of glob patterns on single value', function () {
    assert(matcher(['a', 'b'])('a'));
    assert(!matcher(['a', 'b'])('c'));
    assert(matcher(['*-koaip', '!foo-koa'])('x-koaip'));
    assert(!matcher(['*-koaip', '!foo-koa'])('foo-koa'));
    assert(!matcher(['*-koaip', '!foo-koa'])('bar'));
  });

  it('should match an array of glob patterns on multiple values', function () {
    assert(matcher(['a', 'b'])(['a', 'c']));
    assert(!matcher(['a', 'b'])(['e', 'f', 'g']));
    assert(matcher(['*-koaip', '!foo-koa'])(['x-koaip', 'bar-koa']));
    assert(!matcher(['*-koaip', '!foo-koa'])(['foo-koa', 'bar-koa']));
  });

  it('should match a regex', function () {
    var isMatch = matcher(/a/);
    assert(isMatch('a'));
    assert(!isMatch('b'));
  });

  it('should match a function', function () {
    var isMatch = matcher(function  (val) {
      return val === 'a';
    });
    assert(isMatch('a'));
    assert(!isMatch('b'));
  });
});
