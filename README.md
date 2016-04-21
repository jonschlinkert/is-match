# is-match [![NPM version](https://img.shields.io/npm/v/is-match.svg?style=flat)](https://www.npmjs.com/package/is-match) [![NPM downloads](https://img.shields.io/npm/dm/is-match.svg?style=flat)](https://npmjs.org/package/is-match) [![Build Status](https://img.shields.io/travis/jonschlinkert/is-match.svg?style=flat)](https://travis-ci.org/jonschlinkert/is-match)

> Create a matching function from a glob pattern, regex, string, array, object or function.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install is-match --save
```

## Usage

```js
var isMatch = require('is-match');
```

### Create matchers:

**from a string:**

```js
var isMatch = matcher('a')

isMatch('a');
//=> true

isMatch('b');
//=> false
```

**from a glob pattern:**

```js
var isMatch = matcher('*')
isMatch('a'); //=> true

var isMatch = matcher('!b')
isMatch('a'); //=> true

var isMatch = matcher('!b')
isMatch('b'); //=> false
```

**from an array of glob patterns:**

```js
var isMatch = matcher(['b'])
isMatch('a'); //=> false

var isMatch = matcher(['b', 'a'])
isMatch('a'); //=> true

var isMatch = matcher(['b', 'c', '*'])
isMatch('a'); //=> true
```

**from a regex:**

```js
var isMatch = matcher(/a/);

isMatch('a');
//=> true

isMatch('b');
//=> false
```

**from a function:**

```js
var isMatch = matcher(function  (val) {
  return val === 'a';
});
isMatch('a');
//=> true

isMatch('b');
//=> false
```

**from an object:**

```js
var isMatch = matcher({a: 'b'});

isMatch({a: 'b'}); //=> true
isMatch({a: 'b', c: 'd'}); //=> false
isMatch({e: 'f', c: 'd'}); //=> false
```

## Related projects

You might also be interested in these projects:

* [has-glob](https://www.npmjs.com/package/has-glob): Returns `true` if an array has a glob pattern. | [homepage](https://github.com/jonschlinkert/has-glob)
* [is-glob](https://www.npmjs.com/package/is-glob): Returns `true` if the given string looks like a glob pattern or an extglob pattern.… [more](https://www.npmjs.com/package/is-glob) | [homepage](https://github.com/jonschlinkert/is-glob)
* [micromatch](https://www.npmjs.com/package/micromatch): Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch. Just… [more](https://www.npmjs.com/package/micromatch) | [homepage](https://github.com/jonschlinkert/micromatch)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/is-match/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/is-match/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on April 20, 2016._