/*!
 * is-match <https://github.com/jonschlinkert/is-match>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var matcher = require('./');

describe('is-match', function() {
  describe('errors', function() {
    it('should throw if invalid arguments are passed', function() {
      assert.throws(function() {
        matcher();
      });
      assert.throws(function() {
        matcher(null);
      }, TypeError);
    });
  });

  describe('should return a matcher function', function() {
    it('should match an object', function() {
      var isMatch = matcher({a: 'b'});
      assert(!isMatch({a: 'b', c: 'd'}));
      assert(!isMatch({e: 'f', c: 'd'}));
      assert(isMatch({a: 'b'}));
    });

    it('should match a string', function() {
      var isMatch = matcher('a');
      assert(!isMatch('abc'));
      assert(!isMatch('b'));
      assert(!isMatch('def'));
      assert(isMatch('a'));
    });

    it('should match a number', function() {
      var isMatch = matcher('1');
      assert(isMatch(1));
      assert(isMatch('1'));
      assert(!isMatch('foo'));
    });

    it('should match a string glob pattern on single value', function() {
      assert(!matcher('!b')('b'));
      assert(matcher('!b')('a'));
      assert(matcher('*')('a'));
    });

    it('should match a string glob pattern against multiple values', function() {
      assert(!matcher('!([a-e]).js')(['e.js', 'a.js', 'f.js']));
      assert(!matcher('!([a-e]).js')(['e.js', 'a.js']));
      assert(!matcher('!([B-F]).js')(['B.js']));
      assert(!matcher('{b,[F-Z],!([B-F])}.js')(['B.js']));
      assert(!matcher('{b,[F-Z],[^B-C]}.js')(['B.js']));
      assert(matcher('!([a-e]).js')(['f.js', 'g.js', 'h.js']));
      assert(matcher('*')(['a', 'b']));
      assert(matcher('{b,[F-Z],!([B-C])}.js')(['E.js']));
    });

    it('should match a string non-glob pattern on single value', function() {
      var isMatch = matcher('abc');
      assert(!isMatch('foo abc bar'));
      assert(!isMatch('foo bar baz'));
      assert(isMatch('abc'));
    })

    it('should match a string non-glob pattern on multiple values', function() {
      assert(!matcher('abc')(['foo abc bar', 'baz']));
      assert(!matcher('abc')(['foo', 'abc']));
      assert(!matcher('foo')(['abc']));
      assert(matcher('abc')(['abc']));
    });

    it('should match an array of glob patterns on single value', function() {
      assert(!matcher(['*-bar', '!bar'])('bar'));
      assert(!matcher(['*-bar', '!foo-bar'])('foo-bar'));
      assert(!matcher(['a', 'b'])('c'));
      assert(matcher(['*-bar', '!foo-bar'])('x-bar'));
      assert(matcher(['a', 'b'])('a'));
    });

    it('should match an array of glob patterns on multiple values', function() {
      assert(!matcher(['*-bar', '!foo-bar'])(['foo-bar', 'bar-bar']));
      assert(!matcher(['a', 'b'])(['a', 'c']));
      assert(!matcher(['a', 'b'])(['e', 'f', 'g']));
      assert(matcher(['*-bar', '!foo-bar'])(['x-bar', 'bar-bar']));
    });

    it('should match a regex', function() {
      var isMatch = matcher(/^abc$/);
      assert(!isMatch('abcd'));
      assert(isMatch('abc'));
    });

    it('should match a function', function() {
      var isMatch = matcher(function(val) {
        return val === 'a';
      });
      assert(!isMatch('b'));
      assert(isMatch('a'));
    });
  });
});
