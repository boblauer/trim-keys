(function(name, definition) {
  if (typeof module !== 'undefined') module.exports = definition();
  else if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
  else this[name] = definition();
}('trim', function() {
  "use strict";

  function trimKeys(obj, keyMap) {
    var keep = getKeyMapValue(keyMap) !== 0;
    return keep ? keepKeys(obj, keyMap) : removeKeys(obj, keyMap);
  }

  function keepKeys(obj, keyMap) {
    var keysToKeep = Object.keys(keyMap);

    Object.keys(obj).forEach(function(key) {
      if (keysToKeep.indexOf(key) === -1) {
        delete obj[key];
      } else if (typeof obj[key] === 'object' && typeof keyMap[key] === 'object') {
        obj[key] = keepKeys(obj[key], keyMap[key]);
      }
    });

    return obj;
  }

  function removeKeys(obj, keyMap) {
    var keysToRemove = Object.keys(keyMap);

    Object.keys(obj).forEach(function(key) {
      if (typeof keyMap[key] === 'object') {
        obj[key] = removeKeys(obj[key], keyMap[key]);
      } else if (keysToRemove.indexOf(key) !== -1) {
        delete obj[key];
      }
    });

    return obj;
  }

  function getKeyMapValue(keyMap, valueToMatch) {
    for (var key in keyMap) {
      var currentValue = keyMap[key];
      if (typeof currentValue === 'object') {
        var value = getKeyMapValue(currentValue, valueToMatch);
        if (typeof valueToMatch === 'undefined') {
          valueToMatch = value;
        } else if (value !== valueToMatch) {
          throw new Error('Invalid key-map.  All values must be the same.');
        }
      } else {
        if (valueToMatch !== undefined) {
          if (currentValue !== valueToMatch) {
            throw new Error('Invalid key-map.  All values must be the same.');
          }
        } else {
          valueToMatch = keyMap[key];
        }
      }
    }

    return valueToMatch;
  }

  return trimKeys;

}));
