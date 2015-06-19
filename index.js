/*!
 * is-match <https://github.com/jonschlinkert/is-match>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var where = require('lodash.where');
var isObject = require('isobject');
var isGlob = require('is-glob');
var mm = require('micromatch');

module.exports = function isMatch(pattern, options) {
  if (typeof pattern === 'function') {
    return pattern;
  }

  if (pattern instanceof RegExp) {
    return function (val) {
      return pattern.test(val);
    };
  }

  if (typeof pattern === 'string') {
    if (isGlob(pattern)) {
      return function (val) {
        return mm.isMatch(val, pattern, options);
      };
    }
    return function (val) {
      return pattern === val || pattern.indexOf(val) !== -1;
    };
  }

  if (Array.isArray(pattern)) {
    return function (val) {
      return mm(val, pattern, options).length !== 0;
    };
  }

  if (isObject(pattern)) {
    return function (val) {
      return (where(arrayify(val), pattern) || []).length > 0;
    };
  }
  throw new TypeError('isMatch expects a string, array, regex or function:', arguments);
};


function arrayify(val) {
  return Array.isArray(val) ? val : [val];
}
