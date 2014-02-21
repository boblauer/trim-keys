var assert = chai.assert;

function copy(o) {
  return JSON.parse(JSON.stringify(o));
}

var o = { a: 'v', b: { b1: 'v' }, c: { c1: 'v', c2: 'v' } };

describe('Testing invalid key map', function() {

  it('should throw an exception on an invalid map', function() {
    assert.throw(function() {
      trim({}, { a: 1, b: 2 });
    });
  });

});

describe('Testing basic functionality', function() {

  it('should keep all properties', function() {
    var res = trim(copy(o), { a: 1, b: { b1: 1} , c: { c1: 1, c2: 1 } });
    assert.equal(JSON.stringify(o), JSON.stringify(res));
  });

  it('should remove all properties', function() {
    var res = trim(copy(o), { a: 0, b: 0, c: 0 });
    assert.equal(JSON.stringify({}), JSON.stringify(res));
  });

});

describe('Testing keeping properties', function() {

  it('should keep shallow properties', function() {
    var res = trim(copy(o), { a: 1 });
    assert.equal(JSON.stringify({ a: 'v' }), JSON.stringify(res));
  });

  it('should keep deep properties', function() {
    var res = trim(copy(o), { b: { b1: 1 } });
    assert.equal(JSON.stringify({ b: { b1: 'v' } }), JSON.stringify(res));
  });

});

describe('Testing trimming properties', function() {

  it('should remove shallow properties', function() {
    var res = trim(copy(o), { a: 0 });
    assert.notOk(res.a);
  });

  it('should remove deep properties', function() {
    debugger;
    var res = trim(copy(o), { c: { c1: 0 } });
    assert.ok(res.c, 'o.c still exists');
    assert.notOk(res.c.c1, 'o.c.c1 has been removed');
    assert.ok(res.c.c2, 'o.c.c2 still exists');
  });

});
