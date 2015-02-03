/*!
 * is-match <https://github.com/jonschlinkert/is-match>
 *
 * Copyright (c) 2015 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var mm = require('micromatch');

module.exports = function isMatch(pattern, options) {
  if (typeof pattern === 'function') {
    return pattern;
  }

  if (pattern instanceof RegExp) {
    return function (str) {
      return pattern.test(str);
    };
  }

  if (typeof pattern === 'string') {
    return function (str) {
      return mm.isMatch(str, pattern, options);
    };
  }

  if (Array.isArray(pattern)) {
    return function (str) {
      return !!mm(str, pattern, options).length;
    };
  }

  throw new TypeError('isMatch expects a string, array, regex or function.');
};
