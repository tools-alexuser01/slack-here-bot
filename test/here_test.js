var assert = require('chai').assert;

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

describe('test match string', function() {
  it('should match @here message', function() {
    assert.isNotNull(here.matchString('@here test string'));
  });
  it('should match @herebot message', function() {
    assert.isNotNull(here.matchString('@herebot test string'));
  });
  it('should match @here message', function() {
    assert.isNotNull(here.matchString('test string @here'));
  });
  it('should match @herebot message', function() {
    assert.isNotNull(here.matchString('test string @herebot'));
  });
  it('should match @here message', function() {
    assert.isNull(here.matchString('`@here` test string'));
  });
  it('should match @herebot message', function() {
    assert.isNull(here.matchString('test string `@herebot`'));
  });
});

describe('test replace string', function(){
  it('should replace @here message', function() {
    assert.equal('test string', here.trimString('@here test string'));
  });
  it('should replace @herebot message', function() {
    assert.equal('test string', here.trimString('@herebot test string'));
  });
  it('should replace @here message', function() {
    assert.equal('test string', here.trimString('test string @here'));
  });
  it('should replace @herebot message', function() {
    assert.equal('test string', here.trimString('test string @herebot'));
  });
});
