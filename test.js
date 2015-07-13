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

describe('should return a matching function:', function () {
  it('from an object:', function () {
    var isMatch = matcher({a: 'b'});

    isMatch({a: 'b'}).should.be.true;
    isMatch({a: 'b', c: 'd'}).should.be.false;
    isMatch({e: 'f', c: 'd'}).should.be.false;
  });

  it('from a string:', function () {
    var isMatch = matcher('a');

    isMatch('a').should.be.true;
    isMatch('b').should.be.false;
    matcher('a')('abc').should.be.true;
    matcher('a')('def').should.be.false;
  });

  it('from a string glob pattern:', function () {
    matcher('*')('a').should.be.true;
    matcher('!b')('a').should.be.true;
    matcher('!b')('b').should.be.false;
  });

  it('from a string non-glob pattern:', function () {
    matcher('abc')('foo abc bar').should.be.false;
    matcher('abc')('abc').should.be.true;
    matcher('abc')(['foo', 'abc']).should.be.true;
    matcher('abc')(['foo abc bar', 'baz']).should.be.true;
  });

  it('from an array of glob patterns:', function () {
    matcher(['a'])('a').should.be.false;
    matcher(['b'])('a').should.be.false;
    matcher(['b', 'a'])(['a', 'b']).should.be.false;
    matcher(['b', 'a'])(['b', 'a']).should.be.true;
    matcher(['b', 'c', '*'])(['b', 'c', '*']).should.be.true;
    matcher(['*-koaip', '!foo-koa'])('x-koaip').should.be.true;
    matcher(['*-koaip', '!foo-koa'])(['foo-koa', 'bar-koa']).should.be.false;
  });

  it('from a regex:', function () {
    var isMatch = matcher(/a/);
    isMatch('a').should.be.true;
    isMatch('b').should.be.false;
  });

  it('from a function:', function () {
    var isMatch = matcher(function  (val) {
      return val === 'a';
    });
    isMatch('a').should.be.true;
    isMatch('b').should.be.false;
  });
});
