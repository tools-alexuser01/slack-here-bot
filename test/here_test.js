var assert = require('assert');

var here = require('../src/here.js');

describe('makeMention', function() {
  it('should create mention string in Slack format', function(){
    assert.equal(here.makeMention('1111'), '<@1111>');
  });
});


