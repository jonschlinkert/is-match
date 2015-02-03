/*!
 * is-match <https://github.com/jonschlinkert/is-match>
 *
 * Copyright (c) 2015 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var matcher = require('./');

describe('errors', function () {
  it('should throw an error when invalid args are passed:', function () {
    (function () {
      matcher({a: 'b'});
    }).should.throw('isMatch expects a string, array, regex or function.');
  });
});

describe('should return a matching function:', function () {
  it('from a string:', function () {
    var isMatch = matcher('a')

    isMatch('a').should.be.true;
    isMatch('b').should.be.false;
  });

  it('from a glob pattern:', function () {
    matcher('*')('a').should.be.true;
    matcher('!b')('a').should.be.true;
    matcher('!b')('b').should.be.false;
  });

  it('from an array of glob patterns:', function () {
    matcher(['a'])('a').should.be.true;
    matcher(['b'])('a').should.be.false;
    matcher(['b', 'a'])('a').should.be.true;
    matcher(['b', 'c', '*'])('a').should.be.true;
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
