/*!
 * is-match <https://github.com/jonschlinkert/is-match>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var deepEqual = require('deep-equal');
var isObject = require('isobject');
var isGlob = require('is-glob');
var mm = require('micromatch');

module.exports = isMatch;

function isMatch(matcher, options) {
  if (typeof matcher === 'function') {
    return matcher;
  }

  if (matcher instanceof RegExp) {
    return function (val) {
      return matcher.test(val);
    };
  }

  if (typeof matcher === 'string') {
    if (isGlob(matcher)) {
      return function (val) {
        return mm.isMatch(val, matcher, options);
      };
    }
    return function (val) {
      return matcher === val || matcher.indexOf(val) !== -1;
    };
  }

  if (Array.isArray(matcher) || isObject(matcher)) {
    return function (val) {
      return deepEqual(val, matcher);
    };
  }
  throw new TypeError('isMatch expects a string, array, regex or function:', arguments);
}
