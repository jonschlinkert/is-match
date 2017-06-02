/*!
 * is-match <https://github.com/jonschlinkert/is-match>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var typeOf = require('kind-of');
var deepEqual = require('deep-equal');
var isNumber = require('is-number');
var mm = require('micromatch');

module.exports = function(patterns, options) {
  if (isNumber(patterns)) {
    return function(str) {
      return Number(patterns) === Number(str);
    };
  }

  switch (typeOf(patterns)) {
    case 'function':
      return patterns;
    case 'object':
      return function(val) {
        return deepEqual(val, patterns);
      };
    case 'regexp':
      return function(str) {
        return patterns.test(str);
      };
    case 'array':
    case 'string':
      return function(list) {
        var len = typeof list === 'string' ? 1 : list.length;
        return mm(list, patterns, options).length === len;
      };
    default: {
      throw new TypeError('invalid');
    }
  }
};
