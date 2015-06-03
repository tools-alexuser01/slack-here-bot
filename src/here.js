exports.makeMention = function(userId) {
  return '<@' + userId + '>';
};

exports.isDirect = function(userId, messageText) {
  var userTag = exports.makeMention(userId);
  return messageText &&
         messageText.length >= userTag.length &&
         messageText.substr(0, userTag.length) === userTag;
};

var hereString = new RegExp('(^|[^`])(@here)', 'ig');

exports.matchString = function(message) {
  if (message) {
    return message.match(hereString);
  }
  return null;
};

exports.trimString = function(message) {
  if (message) {
    return message.replace(hereString, '');
  }
  return null;
};

exports.listen = function(message) {
  var match = exports.matchString(message);
  if (match !== null) {
    return exports.trimString(message);
  } else {
    return null;
  }
};
