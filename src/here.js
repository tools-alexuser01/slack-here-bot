exports.makeMention = function(userId) {
  return '<@' + userId + '>';
};

exports.isDirect = function(userId, messageText) {
  var userTag = exports.makeMention(userId);
  return messageText &&
         messageText.length >= userTag.length &&
         messageText.substr(0, userTag.length) === userTag;
};
