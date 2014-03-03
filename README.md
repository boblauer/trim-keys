trim-keys
=========

Keep or remove certain keys from an object.

[![Build Status](https://travis-ci.org/boblauer/trim-keys.png?branch=master)](https://travis-ci.org/boblauer/trim-keys)

## Installation ##
`npm install trim-keys`

## Environment Support ##
trim-keys has been tested in Node, IE9+, Chrome, Firefox, and Opera.

## Usage ##
```javascript
// CommonJS
var trim = require('trim-keys');
```
```javascript
// AMD
require(['trim-keys'], function(trim) { ... });
```
```javascript
// Script Tag
var trim = window.trim;
```

## API ##
```javascript
trim(obj, keyMap)
```

#### __obj__

__type__: __`Object`__

The object to trim.  This object __will be modified__, so if you want to retain your original object, you'll need to pass in a copy of that object.

#### keyMap

__type__: __`Object`__

This object defines what properties to keep, or what properties to remove.  It takes the following form:

```javascript
{ field1: <boolean>, field2: <boolean> ... }
```

The `<boolean>` value can be any of the following:
- `1` or `true` to include the field.
- `0` or `false` to exclude the field.

A `keyMap` __cannot__ contain both include and exclude specifications.  An error will be thrown if all of the keys are not the same value.

## Example ##
```javascript
var trim = require('trim-keys');

var person = { name: 'John Doe', age: 40, height: { ft: 5, in: 10 } };

trim(person, { name: 1 })
// person === { name: 'John Doe' }
```

```javascript
var trim = require('trim-keys');

var person = { name: 'John Doe', age: 40, height: { ft: 5, in: 10 } };

trim(person, { age: 0, height: { in: 0 } });
// person === { name: 'John Doe', height: { ft: 5 } }
```
