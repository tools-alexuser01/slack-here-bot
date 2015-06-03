var assert = require('assert');

var here = require('../src/here.js');

describe('makeMention', function() {
  it('should create mention string in Slack format', function() {
    assert.equal(here.makeMention('1111'), '<@1111>');
  });
});

describe('isDirect', function() {
  it('should test if is direct message in Slack', function() {
    assert.equal(true, here.isDirect('11111', '<@11111> Test message from User 1'));
  });
  it('should test if is\'nt direct message in Slack', function() {
    assert.equal(false, here.isDirect('11111', 'Test message from User 1'));
  });
});
