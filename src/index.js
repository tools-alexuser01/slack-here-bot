// http://blog.somewhatabstract.com/2015/03/02/writing-a-simple-slack-bot-with-node-slack-client/
var Slack = require('slack-client');

var token = process.env.HUBOT_SLACK_TOKEN;

var slack = new Slack(token, true, true);

var here = require('./here.js');

var isDirect = function(userId, messageText) {
  var userTag = here.makeMention(userId);
  // console.log(userId, messageText, userTag);
  return messageText &&
         messageText.length >= userTag.length &&
         messageText.substr(0, userTag.length) === userTag;
};

var getOnlineHumansForChannel = function(channel) {
  if (!channel) return [];

  return (channel.members || [])
      .map(function(id) { return slack.users[id]; })
      .filter(function(u) { return !!u && !u.is_bot && u.presence === 'active'; });
};

slack.on('open', function() {
  var channels = Object.keys(slack.channels)
      .map(function(k) { return slack.channels[k]; })
      .filter(function(c) { return c.is_member; })
      .map(function(c) { return c.name; });

  var groups = Object.keys(slack.groups)
      .map(function(k) { return slack.groups[k]; })
      .filter(function(g) { return g.is_open && !g.is_archived; })
      .map(function(g) { return g.name; });

  console.log('Welcome to Slack. You are ' + slack.self.name + ' of ' + slack.team.name);

  if (channels.length > 0) {
    console.log('You are in: ' + channels.join(', '));
  } else {
    console.log('You are not in any channels.');
  }

  if (groups.length > 0) {
    console.log('As well as: ' + groups.join(', '));
  }
});

slack.on('message', function(message) {
  var channel = slack.getChannelGroupOrDMByID(message.channel);
  var user = slack.getUserByID(message.user);

  if (message.type === 'message') {
    var match = message.text.match(/@here/);
    if (match !== null) {
      var trimmedMessage = message.text.replace(/@here/, '');

      var onlineUsers = getOnlineHumansForChannel(channel)
          .filter(function(u) { return u.id != user.id; })
          .map(function(u) { return here.makeMention(u.id); });

      channel.send(onlineUsers.join(', ') + '\r\n' + user.real_name + ' said: ' + trimmedMessage);
    }
  }
});

slack.login();
